document.addEventListener("DOMContentLoaded", () => {
    let users = [{
            name: "Lorem Ipsum",
            barcode: 5990000000000,
            payments: [{
                    date: "2020-02-02",
                    amount: "3000"
                },
                {
                    date: "2020-03-01",
                    amount: "2000"
                }
            ]
        },
        {
            name: "Dolor Sit",
            barcode: 5990000000001,
            payments: [{
                date: "2019-02-02",
                amount: "3000"
            }, {
                date: "2020-02-02",
                amount: "3000"
            }, {
                date: "2020-02-02",
                amount: "2000"
            }, {
                date: "2020-04-02",
                amount: "5000"
            }]
        },
        {
            name: "Amet Consectetur",
            barcode: 5990000000002,
            payments: [{
                date: "2020-04-02",
                amount: "3000"
            }]
        },
        {
            name: "Adipisicing Elit",
            barcode: 5990000000003,
            payments: []
        }
    ];
    let usersList = document.querySelector('#usersList');
    let deselectUser = document.querySelector('#btnDeselectUser');
    let allUsers;
    let paymentList = document.querySelector('#paymentList');
    let addPayment = document.querySelector('#btnAddPayment');
    let removePayment = document.querySelector('#btnRemovePayment');
    let deselectPayment = document.querySelector('#btnDeselectPayment');
    let allPayments;
    let date = document.querySelector('#date');
    let amount = document.querySelector('#amount');
    let alert = document.querySelector('.alert');
    let groupByDefault = document.querySelector('#btnDefault');
    let groupByYear = document.querySelector('#btnYear');
    let activeGroupButton = document.querySelector('#btnDefault');

    function addDefaultData() {
        for (let i = 0; i < users.length; i++) {
            let user = document.createElement("li");
            let barcode = document.createElement("span");
            let id = document.createElement("span");
            usersList.appendChild(user);
            user.innerHTML = users[i].name;
            user.appendChild(id);
            user.appendChild(barcode);
            barcode.innerHTML = "Barcode: " + users[i].barcode;
            user.classList.add("user");
            user.barcode = users[i].barcode;
            user.id = i;
        }
        let selectUser = document.createElement("li");
        paymentList.appendChild(selectUser);
        selectUser.innerHTML = "Please select a user!";
        selectUser.classList.add("selectUser");
        allUsers = document.querySelectorAll('.user');
        for (let i = 0; i < allUsers.length; i++) {
            allUsers[i].addEventListener('click', function () {
                if (activeGroupButton.id == "btnDefault") {
                    updateData(i, true);
                } else {
                    updateDataByYear(i, true);
                }
            });
        }
    }

    function updateData(t, calledByUsers) {
        alert.style.visibility = "hidden";
        if (calledByUsers) {
            paymentList.innerHTML = "";
            deselectUsers();
            allUsers[t].classList.add("active");
            for (let k = 0; k < users[t].payments.length; k++) {
                let paymentDate = document.createElement("li");
                let payment = document.createElement("span");
                paymentList.appendChild(paymentDate);
                paymentDate.innerHTML = users[t].payments[k].date + ":";
                paymentDate.appendChild(payment);
                payment.innerHTML = users[t].payments[k].amount + " Ft";
                paymentDate.classList.add("payment");
            }
            if (paymentList.innerHTML == "") {
                let noPayment = document.createElement("li");
                paymentList.appendChild(noPayment);
                noPayment.innerHTML = "No payment yet";
            }
            allPayments = document.querySelectorAll('.payment');
            for (let i = 0; i < allPayments.length; i++) {
                allPayments[i].addEventListener('click', function () {
                    updateData(i, false)
                });
            }
        } else {
            deselectPayments();
            allPayments[t].classList.add("active");
        }
    }

    function updateDataByYear(t, calledByUsers) {
        alert.style.visibility = "hidden";
        if (calledByUsers) {
            paymentList.innerHTML = "";
            deselectUsers();
            allUsers[t].classList.add("active");
            if (users[t].payments.length != 0) {
                for (let i = parseInt(users[t].payments[0].date.substr(0, 4)); i < parseInt(users[t].payments[users[t].payments.length - 1].date.substr(0, 4)) + 1; i++) {
                    let paymentYear = document.createElement("li");
                    paymentList.appendChild(paymentYear);
                    paymentYear.classList.add("year");
                    paymentYear.innerHTML = i;
                    for (let j = 1; j < 13; j++) {
                        let paymentDate = document.createElement("li");
                        let paymentSum = document.createElement("span");
                        let payment = 0;
                        paymentList.appendChild(paymentDate);
                        paymentDate.innerHTML = i + "-" + j + ":";
                        paymentDate.appendChild(paymentSum);
                        for (let k = 0; k < users[t].payments.length; k++) {
                            if (parseInt(users[t].payments[k].date.substr(0, 4)) == i && parseInt(users[t].payments[k].date.substr(5, 2)) == j) {
                                payment += parseInt(users[t].payments[k].amount);
                            }
                        }
                        if (payment != 0) {
                            paymentSum.innerHTML = payment + " Ft";
                        } else {
                            paymentSum.innerHTML = "Még nincs befizetés!";
                        }
                        paymentDate.classList.add("payment");
                    }
                }
            }
            if (paymentList.innerHTML == "") {
                let noPayment = document.createElement("li");
                paymentList.appendChild(noPayment);
                noPayment.innerHTML = "No payment yet";
            }
            allPayments = document.querySelectorAll('.payment');
            for (let i = 0; i < allPayments.length; i++) {
                allPayments[i].addEventListener('click', function () {
                    updateData(i, false)
                });
            }
        } else {
            deselectPayments();
            allPayments[t].classList.add("active");
        }
    }

    function deselectUsers() {
        for (let i = 0; i < allUsers.length; i++) {
            allUsers[i].classList.remove("active");
        }
    }

    function deselectPayments() {
        for (let i = 0; i < allPayments.length; i++) {
            allPayments[i].classList.remove("active");
        }
    }

    function addPayments(i) {
        let index = document.querySelector('.user.active');
        if (index) {
            if (date.value && amount.value) {
                alert.style.visibility = "hidden";
                users[index.id].payments.push({
                    date: date.value,
                    amount: amount.value
                });
                users[index.id].payments.sort((a, b) => (a.date > b.date) ? 1 : ((b.date > a.date) ? -1 : 0));
                if (activeGroupButton.id == "btnDefault") {
                    updateData(index.id, true);
                } else {
                    updateDataByYear(index.id, true);
                }
                date.value = "";
                amount.value = "";
            } else {
                alert.style.visibility = "visible";
                alert.innerHTML = "Values not set!";
            }
        } else {
            alert.style.visibility = "visible";
            alert.innerHTML = "No user selected!";
        }
    }

    function removePayments() {
        let indexPayment = document.querySelector('.payment.active');
        let indexUser = document.querySelector('.user.active');
        if (indexUser && indexPayment) {
            users[indexUser.id].payments.splice(indexPayment.id, 1);
            if (activeGroupButton.id == "btnDefault") {
                updateData(indexUser.id, true);
            } else {
                updateDataByYear(indexUser.id, true);
            }
        } else if (!indexUser) {
            alert.style.visibility = "visible";
            alert.innerHTML = "No user selected!";
        } else {
            alert.style.visibility = "visible";
            alert.innerHTML = "No payment selected!";
        }
    }

    function groupByDefaultF() {
        addPayment.disabled = false;
        removePayment.disabled = false;
        let index = document.querySelector('.user.active');
        if (index) {
            activeGroupButton = document.querySelector('#btnDefault');
            groupByYear.classList.remove('btn-secondary');
            groupByYear.classList.add('btn-outline-secondary');
            groupByDefault.classList.remove('btn-outline-secondary');
            groupByDefault.classList.add('btn-secondary');
            updateData(index.id, true);
        } else {
            alert.style.visibility = "visible";
            alert.innerHTML = "No user selected!";
        }
    }

    function groupByYearF() {
        addPayment.disabled = true;
        removePayment.disabled = true;
        let index = document.querySelector('.user.active');
        if (index) {
            activeGroupButton = document.querySelector('#btnYear');
            groupByDefault.classList.remove('btn-secondary');
            groupByDefault.classList.add('btn-outline-secondary');
            groupByYear.classList.remove('btn-outline-secondary');
            groupByYear.classList.add('btn-secondary');
            updateDataByYear(index.id, true);
        } else {
            alert.style.visibility = "visible";
            alert.innerHTML = "No user selected!";
        }
    }

    addDefaultData();

    deselectUser.addEventListener('click', function () {
        deselectUsers();
        paymentList.innerHTML = "";
        let selectUser = document.createElement("li");
        paymentList.appendChild(selectUser);
        selectUser.innerHTML = "Please select a user!";
        selectUser.classList.add("selectUser");
    });

    deselectPayment.addEventListener('click', deselectPayments);

    addPayment.addEventListener('click', addPayments);

    removePayment.addEventListener('click', removePayments);

    groupByDefault.addEventListener('click', groupByDefaultF);

    groupByYear.addEventListener('click', groupByYearF);
});