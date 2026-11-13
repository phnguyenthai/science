# Lesson 1: Why time order matters in financial ML

## Goal

Understand why a random train/test split can make a financial model look better than it would have performed in a real future deployment.

## The core idea

A model is trained on information available up to some point and then used to make predictions about what happens afterward. A credible evaluation should imitate that sequence:

1. Choose a cutoff date.
2. Train using only information that would have been available by that date.
3. Evaluate on a later period that was not used to fit or tune the model.
4. Keep the final test period untouched until decisions are finished.

This is often called a chronological or walk-forward evaluation.

## A tiny example

Imagine daily observations from January through June:

| Period | Dates | Role |
|---|---|---|
| Training | January–March | Fit the model |
| Validation | April | Choose features and settings |
| Test | May–June | Final, one-time evaluation |

With a random split, some May observations might be used for training while February observations are used for testing. That reverses the order in which a real strategy would encounter the data. A model can benefit from later market conditions that would not have been known at the time of the February prediction.

## A chronological split is necessary, not sufficient

Keeping dates in order prevents that particular future-to-past problem, but it does not guarantee a clean test:

- A feature may accidentally use a future price.
- A label may use returns that extend beyond the split boundary.
- A scaler, feature selector, or other preprocessing step may be fit on validation or test data.
- Repeatedly adjusting a model after seeing test results turns the test period into part of the development process.

Later lessons will cover leakage controls, purging, embargoes, and backtest overfitting in more detail.

## Work through it

Suppose your goal is to predict whether the next five trading days have a positive return. At the end of March, you plan to train; April is validation; May and June are the final test.

1. What information is available when you make a prediction on March 31?
2. If a training label uses returns through April 5, does that example belong entirely to the training period?
3. Why is it a problem to choose model settings based on May–June results?
4. If you inspect May–June, change the model, and evaluate May–June again, is that still an untouched test?

## Check your understanding

Explain in your own words:

- What real-world sequence should an evaluation imitate?
- What does chronological splitting prevent?
- Name one type of leakage it does not automatically prevent.

## Takeaway

Evaluate models in the order information would have arrived. Respecting time is the starting point for trustworthy financial ML evaluation, not the whole solution.
