"use strict";

const holdingsElement = document.querySelector("#holdings");
const addHoldingButton = document.querySelector("#add-holding");
const scenarioButtons = [...document.querySelectorAll(".scenario-card")];
const afterValueElement = document.querySelector("#after-value");
const beforeValueLabel = document.querySelector("#before-value-label");
const lossValueElement = document.querySelector("#loss-value");
const lossPercentElement = document.querySelector("#loss-percent");
const recoveryValueElement = document.querySelector("#recovery-value");
const impactBarElement = document.querySelector("#impact-bar");
const insightElement = document.querySelector("#insight p");

const currency = new Intl.NumberFormat(undefined, {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const percent = new Intl.NumberFormat(undefined, {
  maximumFractionDigits: 1,
});

function makeHolding(name, value, shock) {
  const row = document.createElement("div");
  row.className = "holding-row";

  const nameInput = document.createElement("input");
  nameInput.className = "field";
  nameInput.type = "text";
  nameInput.placeholder = "e.g. Fund A";
  nameInput.value = name;
  nameInput.setAttribute("aria-label", "Holding name");

  const valueWrap = document.createElement("div");
  valueWrap.className = "number-wrap";
  const valueInput = document.createElement("input");
  valueInput.className = "field holding-value";
  valueInput.type = "number";
  valueInput.min = "0";
  valueInput.step = "any";
  valueInput.value = String(value);
  valueInput.inputMode = "decimal";
  valueInput.setAttribute("aria-label", "Holding value in dollars");
  const dollarUnit = document.createElement("span");
  dollarUnit.className = "unit";
  dollarUnit.textContent = "$";
  valueWrap.append(valueInput, dollarUnit);

  const shockWrap = document.createElement("div");
  shockWrap.className = "number-wrap";
  const shockInput = document.createElement("input");
  shockInput.className = "field holding-shock";
  shockInput.type = "number";
  shockInput.min = "-100";
  shockInput.max = "100";
  shockInput.step = "1";
  shockInput.value = String(shock);
  shockInput.inputMode = "decimal";
  shockInput.setAttribute("aria-label", "Hypothetical percentage change");
  const percentUnit = document.createElement("span");
  percentUnit.className = "unit";
  percentUnit.textContent = "%";
  shockWrap.append(shockInput, percentUnit);

  const removeButton = document.createElement("button");
  removeButton.className = "remove-button";
  removeButton.type = "button";
  removeButton.textContent = "×";
  removeButton.setAttribute("aria-label", "Remove holding");
  removeButton.addEventListener("click", () => {
    row.remove();
    calculate();
  });

  row.append(nameInput, valueWrap, shockWrap, removeButton);
  row.addEventListener("input", () => {
    scenarioButtons.forEach((button) => button.setAttribute("aria-pressed", "false"));
    calculate();
  });
  return row;
}

function readHoldings() {
  return [...holdingsElement.querySelectorAll(".holding-row")].map((row) => {
    const valueInput = row.querySelector(".holding-value");
    const shockInput = row.querySelector(".holding-shock");
    const value = Number(valueInput.value);
    const shock = Number(shockInput.value);

    const valueIsValid = valueInput.value !== "" && Number.isFinite(value) && value >= 0;
    const shockIsValid = shockInput.value !== ""
      && Number.isFinite(shock)
      && shock >= -100
      && shock <= 100;
    valueInput.setCustomValidity(valueIsValid ? "" : "Enter a value of zero or more.");
    shockInput.setCustomValidity(shockIsValid ? "" : "Enter a percentage from -100 to 100.");
    valueInput.setAttribute("aria-invalid", String(!valueIsValid));
    shockInput.setAttribute("aria-invalid", String(!shockIsValid));

    return {
      value,
      shock,
      valid: valueIsValid && shockIsValid,
    };
  });
}

function calculate() {
  const rows = readHoldings();
  if (rows.some((holding) => !holding.valid)) {
    afterValueElement.textContent = "Fix inputs";
    beforeValueLabel.textContent = "Enter valid values to calculate";
    lossValueElement.textContent = "—";
    lossPercentElement.textContent = "Check values";
    recoveryValueElement.textContent = "—";
    impactBarElement.style.width = "0%";
    insightElement.textContent = "Use holding values of zero or more and hypothetical changes from -100% to 100%.";
    return;
  }

  const startingValue = rows.reduce((total, holding) => total + holding.value, 0);
  const afterValue = rows.reduce(
    (total, holding) => total + holding.value * (1 + holding.shock / 100),
    0,
  );
  const loss = startingValue - afterValue;
  const lossPercent = startingValue === 0 ? 0 : (loss / startingValue) * 100;
  const recoveryPercent = afterValue <= 0
    ? null
    : loss > 0
      ? (loss / afterValue) * 100
      : 0;
  const retainedPercent = startingValue === 0
    ? 100
    : Math.max(0, Math.min(100, (afterValue / startingValue) * 100));

  afterValueElement.textContent = currency.format(afterValue);
  beforeValueLabel.textContent = `Starting value: ${currency.format(startingValue)}`;
  lossValueElement.textContent = loss >= 0
    ? `−${currency.format(loss)}`
    : `+${currency.format(Math.abs(loss))}`;
  lossValueElement.classList.toggle("loss-number", loss >= 0);
  lossPercentElement.textContent = `${percent.format(Math.abs(lossPercent))}% of starting value ${loss >= 0 ? "lost" : "gained"}`;
  recoveryValueElement.textContent = recoveryPercent === null
    ? "Not possible"
    : `${percent.format(recoveryPercent)}%`;
  impactBarElement.style.width = `${retainedPercent}%`;
  impactBarElement.setAttribute("aria-label", `${percent.format(retainedPercent)} percent of starting value remains`);

  if (startingValue === 0) {
    insightElement.textContent = "Enter a holding value greater than zero to see the hypothetical impact.";
  } else if (loss > 0 && afterValue > 0) {
    insightElement.textContent = `In this scenario, the entered holdings lose ${currency.format(loss)} in total. The recovery percentage is larger than the loss percentage because it is calculated from the smaller, post-drop value.`;
  } else if (afterValue === 0 && loss > 0) {
    insightElement.textContent = "This scenario takes the entered portfolio value to zero; a zero value cannot recover through a percentage gain alone.";
  } else if (loss < 0) {
    insightElement.textContent = `In this scenario, the entered holdings gain ${currency.format(Math.abs(loss))} in total. This is just the arithmetic of your inputs, not a prediction.`;
  } else {
    insightElement.textContent = "With these inputs, the scenario leaves the entered portfolio value unchanged.";
  }
}

function selectScenario(button) {
  const shock = Number(button.dataset.shock);
  holdingsElement.querySelectorAll(".holding-shock").forEach((input) => {
    input.value = String(shock);
  });
  scenarioButtons.forEach((scenarioButton) => {
    scenarioButton.setAttribute("aria-pressed", String(scenarioButton === button));
  });
  calculate();
}

holdingsElement.append(
  makeHolding("Holding A", 10000, -10),
  makeHolding("Holding B", 5000, -10),
);

addHoldingButton.addEventListener("click", () => {
  const row = makeHolding("", 0, -10);
  holdingsElement.append(row);
  row.querySelector("input").focus();
  calculate();
});

scenarioButtons.forEach((button) => {
  button.setAttribute("aria-pressed", "false");
  button.addEventListener("click", () => selectScenario(button));
});

calculate();
