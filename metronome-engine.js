// Metronome Engine using Web Audio API
class MetronomeEngine {
    constructor() {
        this.audioContext = null;
        this.isPlaying = false;
        this.bpm = 120;
        this.timeSignature = 4;
        this.subdivision = 1.0; // quarter note (multiplier: 1.0 = quarter, 2.0 = eighth, 1.5 = triplet, 4.0 = sixteenth)
        this.accentOnDownbeat = false;
        this.soundEnabled = true;
        this.clickSoundType = 'classic';
        this.accentFrequency = 1000;
        this.beatFrequency = 600;
        
        this.beatNumber = 0;
        this.nextBeatTime = 0;
        this.scheduleAheadTime = 0.1; // How far ahead to schedule
        this.lookahead = 25.0; // How frequently to call scheduling function (ms)
        this.scheduleInterval = null;
        this.beatCallbacks = []; // For visual sync
        
        this.initAudioContext();
    }
    
    onBeat(callback) {
        this.beatCallbacks.push(callback);
    }
    
    emitBeat(beatNumber, isDownbeat) {
        this.beatCallbacks.forEach(cb => cb(beatNumber, isDownbeat));
    }
    
    initAudioContext() {
        try {
            // Use webkitAudioContext for Safari compatibility
            const AudioContextClass = window.AudioContext || window.webkitAudioContext;
            if (!AudioContextClass) {
                console.error('Web Audio API not supported');
                return;
            }
            this.audioContext = new AudioContextClass();
        } catch (e) {
            console.error('Failed to create audio context:', e);
        }
    }
    
    async start() {
        if (this.isPlaying) return;
        if (!this.audioContext) {
            this.initAudioContext();
            if (!this.audioContext) {
                console.error('Cannot start: audio context not available');
                return;
            }
        }
        
        // Resume audio context if suspended (required by Safari and some browsers)
        // Safari requires user interaction before audio can play
        if (this.audioContext.state === 'suspended') {
            try {
                await this.audioContext.resume();
                // Wait a bit for the context to fully resume
                if (this.audioContext.state !== 'running') {
                    console.warn('Audio context not running after resume');
                }
            } catch (e) {
                console.error('Failed to resume audio context:', e);
                return;
            }
        }
        
        this.isPlaying = true;
        this.beatNumber = 0;
        
        // Calculate beat interval
        // subdivision is a multiplier: 1.0 = quarter, 2.0 = eighth, 1.5 = triplet, 4.0 = sixteenth
        // This represents how many subdivision beats fit in one quarter note
        const quarterNotesPerSecond = this.bpm / 60.0;
        const subdivisionBeatsPerSecond = quarterNotesPerSecond * this.subdivision;
        this.beatInterval = 1.0 / subdivisionBeatsPerSecond;
        
        // Get current time and schedule immediate click
        const currentTime = this.audioContext.currentTime;
        const immediateClickTime = currentTime + 0.001; // 1ms delay for safety
        
        // Play immediate first click (beat 1)
        const isFirstDownbeat = this.accentOnDownbeat;
        this.playClick(immediateClickTime, isFirstDownbeat);
        
        // CRITICAL: Set beatNumber to 2 since we just played beat 1
        // This ensures the next scheduled beat is beat 2 (not another beat 1)
        this.beatNumber = 2;
        this.nextBeatTime = immediateClickTime + this.beatInterval;
        
        // Emit event for visual sync
        this.emitBeat(1, isFirstDownbeat);
        
        // Start scheduling loop
        this.schedule();
        this.scheduleInterval = setInterval(() => this.schedule(), this.lookahead);
    }
    
    stop() {
        if (!this.isPlaying) return;
        
        this.isPlaying = false;
        if (this.scheduleInterval) {
            clearInterval(this.scheduleInterval);
            this.scheduleInterval = null;
        }
        this.beatNumber = 0;
    }
    
    schedule() {
        if (!this.isPlaying) return;
        
        const currentTime = this.audioContext.currentTime;
        
        // Schedule beats ahead
        while (this.nextBeatTime < currentTime + this.scheduleAheadTime) {
            // Calculate beats per bar: timeSignature is quarter notes per bar
            // subdivision multiplier tells us how many subdivision beats per quarter note
            const beatsPerBar = this.timeSignature * this.subdivision;
            const beatIndexInBar = ((this.beatNumber - 1) % beatsPerBar) + 1;
            const isDownbeat = (beatIndexInBar === 1) && this.accentOnDownbeat;
            
            this.playClick(this.nextBeatTime, isDownbeat);
            
            // Emit event for visual sync at the exact beat time
            const delay = Math.max(0, (this.nextBeatTime - currentTime) * 1000);
            setTimeout(() => {
                this.emitBeat(this.beatNumber, isDownbeat);
            }, delay);
            
            this.nextBeatTime += this.beatInterval;
            this.beatNumber++;
        }
    }
    
    playClick(time, isDownbeat) {
        if (!this.soundEnabled) return;
        
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        const frequency = isDownbeat ? this.accentFrequency : this.beatFrequency;
        const duration = isDownbeat ? 0.05 : 0.04;
        
        // Generate click sound based on type - pass startTime for proper scheduling
        switch (this.clickSoundType) {
            case 'classic':
                this.createClassicClick(oscillator, gainNode, frequency, duration, isDownbeat, time);
                break;
            case 'rimShot':
                this.createRimShotClick(oscillator, gainNode, frequency, duration, isDownbeat, time);
                break;
            case 'woodblock':
                this.createWoodblockClick(oscillator, gainNode, frequency, duration, isDownbeat, time);
                break;
            case 'stick':
                this.createStickClick(oscillator, gainNode, frequency, duration, isDownbeat, time);
                break;
            case 'electronic':
                this.createElectronicClick(oscillator, gainNode, frequency, duration, isDownbeat, time);
                break;
            case 'bell':
                this.createBellClick(oscillator, gainNode, frequency, duration, isDownbeat, time);
                break;
            default:
                this.createClassicClick(oscillator, gainNode, frequency, duration, isDownbeat, time);
        }
        
        oscillator.start(time);
        oscillator.stop(time + duration);
    }
    
    createClassicClick(oscillator, gainNode, frequency, duration, isDownbeat, startTime) {
        oscillator.type = 'sine';
        oscillator.frequency.value = frequency;
        
        const amplitude = isDownbeat ? 0.6 : 0.45;
        const attackTime = 0.001;
        const decayTime = isDownbeat ? 0.015 : 0.012;
        const sustainLevel = 0.1;
        const releaseTime = 0.015;
        
        // Schedule envelope relative to startTime, not currentTime
        gainNode.gain.setValueAtTime(0, startTime);
        gainNode.gain.linearRampToValueAtTime(amplitude, startTime + attackTime);
        gainNode.gain.exponentialRampToValueAtTime(amplitude * sustainLevel, startTime + attackTime + decayTime);
        gainNode.gain.setValueAtTime(amplitude * sustainLevel, startTime + duration - releaseTime);
        gainNode.gain.linearRampToValueAtTime(0, startTime + duration);
    }
    
    createRimShotClick(oscillator, gainNode, frequency, duration, isDownbeat, startTime) {
        oscillator.type = 'sine';
        oscillator.frequency.value = frequency;
        
        const amplitude = isDownbeat ? 0.65 : 0.5;
        const attackTime = 0.0005;
        const decayTime = isDownbeat ? 0.008 : 0.006;
        const sustainLevel = 0.05;
        const releaseTime = 0.01;
        
        gainNode.gain.setValueAtTime(0, startTime);
        gainNode.gain.linearRampToValueAtTime(amplitude, startTime + attackTime);
        gainNode.gain.exponentialRampToValueAtTime(amplitude * sustainLevel, startTime + attackTime + decayTime);
        gainNode.gain.setValueAtTime(amplitude * sustainLevel, startTime + duration - releaseTime);
        gainNode.gain.linearRampToValueAtTime(0, startTime + duration);
    }
    
    createWoodblockClick(oscillator, gainNode, frequency, duration, isDownbeat, startTime) {
        oscillator.type = 'sine';
        oscillator.frequency.value = frequency;
        
        const amplitude = isDownbeat ? 0.55 : 0.4;
        const attackTime = 0.002;
        const decayTime = isDownbeat ? 0.025 : 0.02;
        const sustainLevel = 0.15;
        const releaseTime = 0.025;
        
        gainNode.gain.setValueAtTime(0, startTime);
        gainNode.gain.linearRampToValueAtTime(amplitude, startTime + attackTime);
        gainNode.gain.exponentialRampToValueAtTime(amplitude * sustainLevel, startTime + attackTime + decayTime);
        gainNode.gain.setValueAtTime(amplitude * sustainLevel, startTime + duration - releaseTime);
        gainNode.gain.linearRampToValueAtTime(0, startTime + duration);
    }
    
    createStickClick(oscillator, gainNode, frequency, duration, isDownbeat, startTime) {
        oscillator.type = 'sine';
        oscillator.frequency.value = frequency;
        
        const amplitude = isDownbeat ? 0.5 : 0.4;
        const attackTime = 0.0003;
        const decayTime = isDownbeat ? 0.01 : 0.008;
        const sustainLevel = 0.0;
        const releaseTime = 0.005;
        
        gainNode.gain.setValueAtTime(0, startTime);
        gainNode.gain.linearRampToValueAtTime(amplitude, startTime + attackTime);
        gainNode.gain.exponentialRampToValueAtTime(amplitude * sustainLevel, startTime + attackTime + decayTime);
        gainNode.gain.setValueAtTime(amplitude * sustainLevel, startTime + duration - releaseTime);
        gainNode.gain.linearRampToValueAtTime(0, startTime + duration);
    }
    
    createElectronicClick(oscillator, gainNode, frequency, duration, isDownbeat, startTime) {
        oscillator.type = 'square';
        oscillator.frequency.value = frequency;
        
        const amplitude = isDownbeat ? 0.6 : 0.45;
        const attackTime = 0.001;
        const decayTime = isDownbeat ? 0.015 : 0.012;
        const sustainLevel = 0.05;
        const releaseTime = 0.01;
        
        gainNode.gain.setValueAtTime(0, startTime);
        gainNode.gain.linearRampToValueAtTime(amplitude, startTime + attackTime);
        gainNode.gain.exponentialRampToValueAtTime(amplitude * sustainLevel, startTime + attackTime + decayTime);
        gainNode.gain.setValueAtTime(amplitude * sustainLevel, startTime + duration - releaseTime);
        gainNode.gain.linearRampToValueAtTime(0, startTime + duration);
    }
    
    createBellClick(oscillator, gainNode, frequency, duration, isDownbeat, startTime) {
        oscillator.type = 'sine';
        oscillator.frequency.value = frequency;
        
        const amplitude = isDownbeat ? 0.5 : 0.35;
        const attackTime = 0.003;
        const decayTime = isDownbeat ? 0.03 : 0.025;
        const sustainLevel = 0.2;
        const releaseTime = 0.03;
        
        gainNode.gain.setValueAtTime(0, startTime);
        gainNode.gain.linearRampToValueAtTime(amplitude, startTime + attackTime);
        gainNode.gain.exponentialRampToValueAtTime(amplitude * sustainLevel, startTime + attackTime + decayTime);
        gainNode.gain.setValueAtTime(amplitude * sustainLevel, startTime + duration - releaseTime);
        gainNode.gain.linearRampToValueAtTime(0, startTime + duration);
    }
    
    updateBPM(newBPM) {
        this.bpm = newBPM;
        if (this.isPlaying) {
            // Recalculate beat interval
            const quarterNotesPerSecond = this.bpm / 60.0;
            const subdivisionBeatsPerSecond = quarterNotesPerSecond * this.subdivision;
            this.beatInterval = 1.0 / subdivisionBeatsPerSecond;
            // Don't reset beatNumber - preserve measure position
        }
    }
    
    updateSettings(settings) {
        const wasPlaying = this.isPlaying;
        if (wasPlaying) {
            this.stop();
        }
        
        this.bpm = settings.bpm || this.bpm;
        this.timeSignature = settings.timeSignature || this.timeSignature;
        this.subdivision = settings.subdivision || this.subdivision;
        this.accentOnDownbeat = settings.accentOnDownbeat !== undefined ? settings.accentOnDownbeat : this.accentOnDownbeat;
        this.soundEnabled = settings.soundEnabled !== undefined ? settings.soundEnabled : this.soundEnabled;
        this.clickSoundType = settings.clickSoundType || this.clickSoundType;
        this.accentFrequency = settings.accentFrequency || this.accentFrequency;
        this.beatFrequency = settings.beatFrequency || this.beatFrequency;
        
        if (wasPlaying) {
            this.start();
        }
    }
}

