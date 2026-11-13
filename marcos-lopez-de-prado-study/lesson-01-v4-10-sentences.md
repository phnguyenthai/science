# Lesson 1, version 4: The whole idea in 10 sentences

1. A computer model learns from examples and uses what it learned to make guesses.
2. In finance, a guess might be whether a price will go up or down over the next five days.
3. The clues the model uses are called features, and the answer we want it to guess is called a label.
4. We can only know a label after the days it describes have happened.
5. Training means teaching the model with examples whose labels are already known.
6. A cutoff is the day we pretend we are standing on when we decide what information is available.
7. If a label needs prices from after the cutoff, that example is not ready for training yet.
8. Testing means making guesses about later days and checking them after their labels become known.
9. Keep dates in order so the model never learns from December before being tested on February.
10. This helps prevent peeking into the future, but we must still check that the clues do not contain future information.
