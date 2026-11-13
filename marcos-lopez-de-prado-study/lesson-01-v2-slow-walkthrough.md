# Lesson 1, version 2: Train on the past, test on the future

This version slows down the main idea and walks through one example. You do not need machine-learning or finance experience to follow it.

## The one-sentence idea

To test a model fairly, pretend you are standing on a date in the past: train only with information you could have known then, and test on what happened afterward.

## First, think of a weather forecast

Suppose you want to test a weather-forecasting system as it would have worked on March 31.

- You may use weather records from before March 31 to build the system.
- You may not use April weather to build a forecast that supposedly was made on March 31.
- You can then check the forecast against the actual April weather.

If you mix April records into the material used to build the system, your test no longer answers, “How well could it forecast the future?” It answers a different, easier question: “How well could it explain data after seeing some of it?”

Financial models have the same basic issue: prices arrive in date order, and a real decision must be made without knowing tomorrow's prices.

## What is the model learning from?

For each date, imagine a small question-and-answer card:

- **Input (X):** What was known on this date?
- **Answer (y, or label):** What happened after this date?

Example:

| Prediction date | Input available that day | Answer we want to predict |
|---|---|---|
| March 31 | Prices and information available through March 31 | Did the next five trading days have a positive return? |

The answer is not known on March 31. We only learn it after those five trading days have happened.

## The important distinction: input date versus answer date

Suppose the prediction date is **Friday, March 28**, and the label asks whether the return over the **next five trading days** is positive. Those five days run into April.

On March 28:

- The input can be available: it uses information through March 28.
- The answer is not available yet: it depends on prices in April.

Now suppose the model-training cutoff is **Monday, March 31**. If the training example's answer depends on prices through April 4, we cannot honestly say that the example was fully known by March 31. Its future outcome had not happened yet.

**So the example should not be used as a completed training example at the March 31 cutoff.** We can use examples whose answers had already become known by the cutoff.

This is the key idea behind the earlier question: do not decide whether a row belongs in training by looking only at its prediction date. Check when its answer becomes known too.

## Draw the timeline

```text
Past data                         Cutoff             Future data
|----------------------------------|------------------|
Jan              Feb          Mar 31               April
                                  ^
                     Pretend we are standing here
```

For a straightforward split:

```text
TRAIN: rows whose answers were knowable by Mar 31
TEST:  later predictions, checked against outcomes after Mar 31
```

If a training row's answer reaches across the cutoff:

```text
prediction date: Mar 28       answer uses prices: Mar 28 -> Apr 4
                               cutoff: Mar 31
                               ^ answer is not complete yet
```

That row straddles the boundary. Its input is in the past, but part of its answer is in the future. For a strict training set, leave that row out at this cutoff. Later, we will learn the more systematic vocabulary for handling these overlapping label windows.

## Why random splitting is a poor simulation

Imagine shuffling all the daily rows and randomly putting some in training and some in testing. Training may then contain dates from May while testing contains dates from February.

That does not imitate how you would deploy a model in February: in February, May had not happened yet. Random splitting can also let training and test rows come from very similar nearby market conditions, making the test look easier than a true future period.

Important nuance: a random split does not automatically mean the model literally saw the test answers. The basic problem is that it fails to preserve the past-to-future order we need to simulate.

## Three different questions

Keep these questions separate:

1. **Chronology:** Did training come before testing?
2. **Label timing:** Were all training answers already knowable at the training cutoff?
3. **Feature leakage:** Did any input accidentally use information from after its prediction date?

A chronological split helps with question 1. It does not automatically solve questions 2 and 3.

## Worked example: next-five-day direction

Goal: on each trading day, predict whether the next five trading days' return will be positive.

Assume the model is trained at the end of March and tested on April:

1. For a prediction dated March 20, its five-day answer finishes before the end of March. That answer can be available for training.
2. For a prediction dated March 28, its five-day answer finishes in April. At the end-of-March cutoff, that answer is still in the future, so do not treat it as a completed training answer.
3. Make April predictions using only the model and inputs that would have been available at each prediction time.
4. After the five-day outcomes have happened, compare the predictions with those outcomes.
5. Do not keep changing the model based on April test results and then claim April is still an untouched test.

## Quick self-check

**Question:** The prediction date is March 28. The label uses prices through April 4. The training cutoff is March 31. Can that completed label be part of training at the cutoff?

**Answer:** No. Some of the prices needed to know the answer occur after March 31.

**Question:** What if the row's input uses only information through March 28?

**Answer:** That makes the input valid as of March 28, but it does not make the future answer available by March 31. Input timing and answer timing are separate checks.

**Question:** What is the simplest defense against training on the future?

**Answer:** Keep the dates in order and make sure each training answer is fully known before the training cutoff.

## Remember this

For every training row, ask two questions:

1. **When was this prediction supposed to be made?**
2. **When would its answer have become known?**

At the training cutoff, only use rows whose answers were already known. Then test on a later period that you have not used to fit or tune the model.
