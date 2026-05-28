class SequenceManager:

    def __init__(self):

        self.sequence = 0

    def next_sequence(self):

        self.sequence += 1

        return self.sequence
