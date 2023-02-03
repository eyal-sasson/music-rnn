import pretty_midi
import torch
import numpy as np
from IPython import display

def play(pm, seconds=30, sampling_rate=16000):
  waveform = pm.fluidsynth(fs=sampling_rate)
  return display.Audio(waveform[:seconds*sampling_rate], rate=sampling_rate)

def pm_to_tensor(pm, window_size=50):
  piano_roll = pm.get_piano_roll()
  num_windows = piano_roll.shape[1] // window_size
  piano_roll = piano_roll[:, :num_windows * window_size]
  piano_roll = piano_roll.reshape(piano_roll.shape[0], -1, window_size)
  return torch.tensor(piano_roll, dtype=torch.float32)

def tensor_to_pm(piano_roll_tensor, program=0):
  piano_roll = piano_roll_tensor.numpy()
  piano_roll = piano_roll.reshape(piano_roll.shape[0], -1)
  return piano_roll_to_pretty_midi(piano_roll, program=program)

def piano_roll_to_pretty_midi(piano_roll, fs=100, program=0):
    '''Convert a Piano Roll array into a PrettyMidi object
     with a single instrument.
    Parameters
    ----------
    piano_roll : np.ndarray, shape=(128,frames), dtype=int
        Piano roll of one instrument
    fs : int
        Sampling frequency of the columns, i.e. each column is spaced apart
        by ``1./fs`` seconds.
    program : int
        The program number of the instrument.
    Returns
    -------
    midi_object : pretty_midi.PrettyMIDI
        A pretty_midi.PrettyMIDI class instance describing
        the piano roll.
    '''
    notes, frames = piano_roll.shape
    pm = pretty_midi.PrettyMIDI()
    instrument = pretty_midi.Instrument(program=program)

    # pad 1 column of zeros so we can acknowledge inital and ending events
    piano_roll = np.pad(piano_roll, [(0, 0), (1, 1)], 'constant')

    # use changes in velocities to find note on / note off events
    velocity_changes = np.nonzero(np.diff(piano_roll).T)

    # keep track on velocities and note on times
    prev_velocities = np.zeros(notes, dtype=int)
    note_on_time = np.zeros(notes)

    for time, note in zip(*velocity_changes):
        # use time + 1 because of padding above
        velocity = piano_roll[note, time + 1]
        time = time / fs
        if velocity > 0:
            if prev_velocities[note] == 0:
                note_on_time[note] = time
                prev_velocities[note] = velocity
        else:
            pm_note = pretty_midi.Note(
                velocity=prev_velocities[note],
                pitch=note,
                start=note_on_time[note],
                end=time)
            instrument.notes.append(pm_note)
            prev_velocities[note] = 0
    pm.instruments.append(instrument)
    return pm