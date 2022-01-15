const depositForm = document.querySelector("#deposit-form");
const userId = document.querySelector("#userId");
const userAmount = document.querySelector("#amount");
const userName = document.querySelector("#user-name");
const userBalance = document.querySelector("#new-balance");

depositForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const id = userId.value;
  const amount = userAmount.value;
});
