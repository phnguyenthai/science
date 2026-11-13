# Lesson 1, version 3: Don't peek at tomorrow!

Imagine you are trying to guess whether a plant will grow taller next week.

You write down your guess today. Next week, you measure the plant and find out the answer.

That is a little like what a computer model does: it looks at old information, makes a guess, and later we check whether the guess was right.

## Meet the guessing robot

Let's pretend a robot guesses whether a pretend stock's price will go **up** or **down** over the next five school days.

Each time it guesses, we make a card:

- **What the robot knew:** the prices it had seen so far.
- **The answer:** whether the price went up or down during the next five days.

The answer takes time to arrive. If the robot guesses today, we have to wait five days to know whether it was right.

## A Friday example

Pretend today is **Friday, March 28**. The robot makes a guess about what will happen over the next five school days.

The five days are:

```text
Monday  Tuesday  Wednesday  Thursday  Friday
Mar 31   Apr 1     Apr 2      Apr 3    Apr 4
```

We are checking the robot on **Monday, March 31**. By then, only Monday has happened. Tuesday, Wednesday, Thursday, and Friday are still in the future.

So on March 31, we do **not** know whether the robot's five-day guess was right. We have to wait until the other days happen.

That means we should not teach the robot using that card yet. The card's answer is not ready.

## What does “train” mean?

**Train** means showing the robot old examples so it can learn patterns.

But an example is ready for training only after we know its answer.

```text
Guess made:       March 28
Answer ready:     after April 4
Training day:     March 31

Can we use this answer on March 31? No. It is not ready yet.
```

It is okay that the robot used information available on March 28 to make its guess. The problem is using an answer from the future before that future has happened.

## What does “test” mean?

**Test** means letting the robot make guesses on new days, then checking them after the answers arrive.

We want the test to feel fair—like a real guessing game:

1. Learn from examples whose answers are already known.
2. Make guesses about later days.
3. Wait for those days to happen.
4. Check the guesses.

## Why not mix all the days in a bag?

Imagine you shuffle every day of the year and deal some days to the robot for learning and some days for its test.

The robot might learn from **December** and then be tested on **February**. But in real life, February comes before December. If you are standing in February, you cannot know December yet!

So we keep the days in order:

```text
OLDER DAYS: learn
              ↓
NEWER DAYS: guess and test
```

## Three little words

- **Feature:** a clue the robot can use, such as a price it already knows.
- **Label:** the answer we are trying to guess, such as “up” or “down.”
- **Cutoff:** the day we pretend we are standing on. We cannot use anything that happens after it.

## One more important warning

Keeping days in order is a good start, but we still need to check that:

- The clues do not secretly include future information.
- The answers used for learning were already known by the cutoff.
- We do not keep changing the robot after looking at its test answers and then call the same test fair.

## Your turn

The robot guesses on **Tuesday** whether the price will go up over the next five school days. On **Thursday**, we want to train the robot.

The five days are Wednesday, Thursday, Friday, Monday, and Tuesday.

**Do we know the full answer by Thursday?**

No. Friday, Monday, and Tuesday have not happened yet. We must wait before using that example's answer for training.

## Remember

**Only teach the robot with answers it could already know. Make it guess about later days. Don't let it peek at tomorrow!**
