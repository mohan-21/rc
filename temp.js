$("#amountValue1,#amountValue2,#amountValue3").on("keyup", function (event) {
    if (event.keyCode != 9 && event.keyCode != 37 && event.keyCode != 39) {
        this.value = translateToEng(this.value.split(",").join(""))
            .replace(/\D/g, "")
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        if (this.value.length > 0) {
            $(this).removeClass("is-invalid").next().html("");
        } else {
            $(this).addClass("is-invalid").next().html(errorMessageNumber);
        }
    }
    writingPayCal();
});

$("#form-office").on("submit", function (event) {
    if (!showError()) {
        event.preventDefault();
        window.location.hash = "#input-content";
    } else {
        writingPayCal();
        window.location.hash = "result";
        event.preventDefault();
    }
});

function showError(attribute = false) {
    var error = validForm();
    if (error !== true) {
        error.forEach(function (value) {
            if (attribute) {
                if (value[1] == attribute) {
                    $("#" + value[1])
                        .addClass("is-invalid")
                        .next()
                        .html(value[2]);
                }
            } else {
                $("#" + value[1])
                    .addClass("is-invalid")
                    .next()
                    .html(value[2]);
            }
        });
        $("#result").addClass("d-none");
        return false;
    }
    return true;
}

function validForm() {
    var error = [];
    if ($("#type-of-office").val() == "official-documents") {
        var valueOfficialDocument = $("#official-documents-select").val();
        if (valueOfficialDocument == "financial-documents") {
            if (Number.parseInt($("#financial-documents-select").val()) == 1) {
                if ($("#amountValue1").val() == "") {
                    error.push([false, "amountValue1", errorMessageValueOfTheDocument]);
                } else {
                    error.push([true, "amountValue1", ""]);
                }
            } else if (Number.parseInt($("#financial-documents-select").val()) == 2) {
                if ($("#amountValue2").val() == "") {
                    error.push([false, "amountValue2", errorMessageValueOfTheDocument]);
                } else {
                    error.push([true, "amountValue2", ""]);
                }
            } else {
                if ($("#amountValue3").val() == "") {
                    error.push([false, "amountValue3", errorMessageValueOfTheDocument]);
                } else {
                    error.push([true, "amountValue3", ""]);
                }
            }
        }
    }
    if (error.length === 0) {
        return true;
    }
    var status = true;
    for (i = 0; i < error.length; i++) {
        if (error[i][0] === true) {
            $("#" + error[i][1])
                .removeClass("is-invalid")
                .next()
                .html("");
            if (i == error.length - 1 && status) {
                return true;
            }
        } else {
            status = false;
        }
    }
    return error;
}

$("#type-of-office").on("change", function (e) {
    if (this.value == "marriage-and-divorce") {
        showDiv(["#marriage-and-divorce-div"]);
    } else {
        changeViewOfficailDocument();
    }
    writingPayCal();
});

$("#financial-documents-select,#official-documents-select,#non-financial-documents-select,#other-registration-services-select").on("change", function (e) {
    changeViewOfficailDocument();
    writingPayCal();
});

function changeViewOfficailDocument() {
    var valueOfficialDocument = $("#official-documents-select").val();
    var temp;
    if (valueOfficialDocument == "financial-documents") {
        if (Number.parseInt($("#financial-documents-select").val()) == 1) {
            temp = "#amountValue1-div";
        } else if (Number.parseInt($("#financial-documents-select").val()) == 2) {
            temp = "#amountValue2-div";
        } else {
            temp = "#amountValue3-div";
        }
        showDiv(["#official-documents-div", "#financial-documents-div", temp]);
    } else if (valueOfficialDocument == "non-financial-documents") {
        showDiv(["#official-documents-div", "#non-financial-documents-row"]);
        writingPayCal();
    } else {
        showDiv(["#official-documents-div", "#other-registration-services-row"]);
        writingPayCal();
    }
}

function officailDocumentCal() {
    var valueOfficialDocument = $("#official-documents-select").val();
    var result;
    if (valueOfficialDocument == "financial-documents") {
        if (Number.parseInt($("#financial-documents-select").val()) == 1) {
            result = mortgageDocuments(Number.parseInt($("#amountValue1").val().replace(/,/g, ""), 10));
            showResult(result);
        } else if (Number.parseInt($("#financial-documents-select").val()) == 2) {
            result = movableCal(Number.parseInt($("#amountValue2").val().replace(/,/g, ""), 10));
            showResult(result);
        } else {
            result = immovableCal(Number.parseInt($("#amountValue3").val().replace(/,/g, ""), 10));
            showResult(result);
        }
    } else if (valueOfficialDocument == "non-financial-documents") {
        showResult(nonFinancialDocuments($("#non-financial-documents-select").val()));
    } else {
        showResult(otherRegistration($("#other-registration-services-select").val()));
    }
}

function otherRegistration(value) {
    var result;
    switch (Number.parseInt(value)) {
        case 1:
            result = { writing: 800000, tax: Math.round(800000 * 0.09), register: 20000, other: true };
            break;
        case 2:
            result = { writing: 2000000, tax: Math.round(2000000 * 0.09), register: 0, other: "noRegister" };
            break;
        case 3:
            result = { writing: 200000, tax: Math.round(200000 * 0.09), register: 0, other: "noRegister" };
            break;
        case 4:
            result = { writing: 250000, tax: Math.round(250000 * 0.09), register: 0, other: "noRegister" };
            break;
        case 5:
            result = { writing: 400000, tax: Math.round(400000 * 0.09), register: 20000, other: true };
            break;
        case 6:
            result = { writing: 15000, tax: Math.round(15000 * 0.09), register: 20000, other: true };
            break;
        case 7:
            result = { writing: 60000, tax: Math.round(60000 * 0.09), register: 20000, other: true };
            break;
        case 8:
            result = { writing: 50000, tax: Math.round(50000 * 0.09), register: 20000, other: true };
            break;
        case 9:
            result = { writing: 600000, tax: Math.round(600000 * 0.09), register: 0, other: "noRegister" };
            break;
        case 10:
            result = { writing: 500000, tax: Math.round(500000 * 0.09), register: 20000, other: true };
            break;
        case 11:
            result = { writing: 300000, tax: Math.round(300000 * 0.09), register: 20000, other: true };
            break;
        case 12:
            result = { writing: 150000, tax: Math.round(150000 * 0.09), register: 0, other: "noRegister" };
            break;
    }
    return result;
}

function nonFinancialDocuments(value) {
    var result;
    switch (Number.parseInt(value)) {
        case 1:
        case 3:
        case 4:
        case 8:
            result = createMyResult(1000000);
            break;
        case 2:
        case 7:
            result = createMyResult(1500000);
            break;
        case 5:
            result = createMyResult(200000);
            break;
        case 6:
            result = createMyResult(3000000);
            break;
        case 9:
            result = createMyResult(1200000);
            break;
        case 10:
            result = createMyResult(800000);
            break;
    }
    return result;
}

function createMyResult(value) {
    return { writing: value, tax: Math.round(value * 0.09), register: 20000 };
}

function immovableCal(value) {
    var result;
    switch (true) {
        case value <= 2000000:
            result = 800000;
            break;
        case value <= 10000000:
            result = 800000 + (value - 2000000) * (200 / 1000);
            break;
        case value <= 50000000:
            result = 800000 + 8000000 * (200 / 1000);
            result = result + (value - 10000000) * (120 / 1000);
            break;
        case value <= 100000000:
            result = 800000 + 8000000 * (200 / 1000) + 40000000 * (120 / 1000);
            result = result + (value - 50000000) * (40 / 1000);
            break;
        case value <= 200000000:
            result = 800000 + 8000000 * (200 / 1000) + 40000000 * (120 / 1000) + 50000000 * (40 / 1000);
            result = result + (value - 100000000) * (20 / 1000);
            break;
        case value <= 500000000:
            result = 800000 + 8000000 * (200 / 1000) + 40000000 * (120 / 1000) + 50000000 * (40 / 1000) + 100000000 * (20 / 1000);
            result = result + (value - 200000000) * (12 / 1000);
            break;
        case value <= 1000000000:
            result = 800000 + 8000000 * (200 / 1000) + 40000000 * (120 / 1000) + 50000000 * (40 / 1000) + 100000000 * (20 / 1000) + 300000000 * (12 / 1000);
            result = result + (value - 500000000) * (6 / 1000);
            break;
        case value > 1000000000:
            result = 800000 + 40000000 * (120 / 1000) + 50000000 * (40 / 1000) + 100000000 * (20 / 1000) + 300000000 * (12 / 1000) + 300000000 * (12 / 1000) + 500000000 * (6 / 1000);
            result = result + (value - 1000000000) * (3 / 1000);
            break;
    }
    return { writing: Math.round(result), tax: Math.round(result * 0.09), register: Math.round(value * 0.005) };
}

function movableCal(value) {
    var result;
    switch (true) {
        case value <= 2000000:
            result = 350000;
            break;
        case value <= 10000000:
            result = 350000 + (value - 2000000) * (35 / 1000);
            break;
        case value <= 200000000:
            result = 350000 + 8000000 * (35 / 1000);
            result = result + (value - 10000000) * (6 / 1000);
            break;
        case value <= 1000000000:
            result = 350000 + 8000000 * (35 / 1000) + 190000000 * (6 / 1000);
            result = result + (value - 200000000) * (4 / 1000);
            break;
        case value > 1000000000:
            result = 350000 + 8000000 * (35 / 1000) + 190000000 * (6 / 1000) + 800000000 * (4 / 1000);
            result = result + (value - 1000000000) * (1 / 1000);
            break;
    }
    return { writing: Math.round(result), tax: Math.round(result * 0.09), transferTax: Math.round(value * 0.01), register: Math.round(value * 0.005) };
}

function mortgageDocuments(value) {
    var result;
    switch (true) {
        case value <= 10000000:
            result = 800000;
            break;
        case value <= 100000000:
            result = 800000 + (value - 10000000) * (12 / 1000);
            break;
        case value <= 200000000:
            result = 800000 + 90000000 * (12 / 1000);
            result = result + (value - 100000000) * (8 / 1000);
            break;
        case value <= 500000000:
            result = 800000 + 90000000 * (12 / 1000) + 100000000 * (8 / 1000);
            result = result + (value - 200000000) * (5 / 1000);
            break;
        case value <= 1000000000:
            result = 800000 + 90000000 * (12 / 1000) + 100000000 * (8 / 1000) + 300000000 * (5 / 1000);
            result = result + (value - 500000000) * (4 / 1000);
            break;
        case value <= 3000000000:
            result = 800000 + 90000000 * (12 / 1000) + 100000000 * (8 / 1000) + 300000000 * (5 / 1000) + 500000000 * (4 / 1000);
            result = result + (value - 1000000000) * (2 / 1000);
            break;
        case value <= 6000000000:
            result = 800000 + 90000000 * (12 / 1000) + 100000000 * (8 / 1000) + 300000000 * (5 / 1000) + 500000000 * (4 / 1000) + 2000000000 * (2 / 1000);
            result = result + (value - 3000000000) * (1 / 1000);
            break;
        case value <= 10000000000:
            result = 800000 + 90000000 * (12 / 1000) + 100000000 * (8 / 1000) + 300000000 * (5 / 1000) + 500000000 * (4 / 1000) + 2000000000 * (2 / 1000) + 3000000000 * (1 / 1000);
            result = result + (value - 6000000000) * (0.7 / 1000);
            break;
        case value <= 20000000000:
            result = 800000 + 90000000 * (12 / 1000) + 100000000 * (8 / 1000) + 300000000 * (5 / 1000) + 500000000 * (4 / 1000) + 2000000000 * (2 / 1000) + 3000000000 * (1 / 1000) + 4000000000 * (0.7 / 1000);
            result = result + (value - 10000000000) * (0.5 / 1000);
            break;
        case value <= 100000000000:
            result = 800000 + 90000000 * (12 / 1000) + 100000000 * (8 / 1000) + 300000000 * (5 / 1000) + 500000000 * (4 / 1000) + 2000000000 * (2 / 1000) + 3000000000 * (1 / 1000) + 4000000000 * (0.7 / 1000) + 10000000000 * (0.5 / 1000);
            result = result + (value - 20000000000) * (0.2 / 1000);
            break;
        case value > 100000000000:
            result =
                800000 +
                90000000 * (12 / 1000) +
                100000000 * (8 / 1000) +
                300000000 * (5 / 1000) +
                500000000 * (4 / 1000) +
                2000000000 * (2 / 1000) +
                3000000000 * (1 / 1000) +
                4000000000 * (0.7 / 1000) +
                10000000000 * (0.5 / 1000) +
                80000000000 * (0.2 / 1000);
            result = result + (value - 100000000000) * (0.04 / 1000);
            break;
    }
    return { writing: Math.round(result), tax: Math.round(result * 0.09), register: Math.round(value * 0.005) };
}

$("#marriage-and-divorce-select").on("change", function (e) {
    showError($(this).attr("id"));
    writingPayCal();
});

function writingPayCal() {
    var result;
    var amount;
    if (validForm() === true) {
        if ($("#type-of-office").val() == "marriage-and-divorce") {
            switch (Number.parseInt($("#marriage-and-divorce-select").val())) {
                case 1:
                    lineResultMessage(commaSeparator(4000000) + " " + rial);
                    break;
                case 2:
                case 3:
                    lineResultMessage(commaSeparator(5000000) + " " + rial);
                    break;
                case 4:
                case 5:
                    lineResultMessage(commaSeparator(1500000) + " " + rial);
                    break;
                case 6:
                case 10:
                    lineResultMessage(commaSeparator(400000) + " " + rial);
                    break;
                case 7:
                case 9:
                    lineResultMessage(commaSeparator(500000) + " " + rial);
                    break;
                case 8:
                    lineResultMessage(commaSeparator(1000000) + " " + rial);
                    break;
                case 11:
                    lineResultMessage(commaSeparator(200000) + " " + rial);
                    break;
            }
        } else {
            officailDocumentCal();
        }
        $("#result").removeClass("d-none");
    } else {
        $("#result").addClass("d-none");
    }
}

function showDiv(showDiv) {
    var divArray = ["#marriage-and-divorce-div", "#official-documents-div", "#financial-documents-div", "#amountValue1-div", "#amountValue2-div", "#amountValue3-div", "#non-financial-documents-row", "#other-registration-services-row"];
    if (showDiv.length > 0) {
        divArray = divArray.filter(function (el) {
            return showDiv.indexOf(el) < 0;
        });
        $(showDiv.join(",")).removeClass("d-none");
    }
    $(divArray.join(",")).addClass("d-none");
}

function lineResultMessage(meesage) {
    $("#lineResult-view").html(meesage);
    $("#lineResult").removeClass("d-none");
    $("#result-header,#result-body").addClass("d-none");
}

function showResult(result) {
    $("#lineResult").addClass("d-none");
    $("#writingView").html(commaSeparator(result.writing) + " " + rial);
    if (result.other && result.other == "noRegister") {
        $("#registerViewLi,#registerViewLi2,#total-li2").addClass("d-none");
    } else {
        $("#registerView,#registerView2")
            .html(commaSeparator(result.register) + " " + rial)
            .parent()
            .removeClass("d-none");
        $("#total-li2").removeClass("d-none");
    }
    $("#taxView").html(commaSeparator(result.tax) + " " + rial);
    if (result.other) {
        $("#edrViewLi").addClass("d-none");
    } else {
        $("#edrView")
            .html(commaSeparator(150000) + " " + rial)
            .parent()
            .removeClass("d-none");
    }
    if (result.transferTax) {
        $("#transferTaxView").html(commaSeparator(result.transferTax) + " " + rial);
        $("#totalView").html(commaSeparator(150000 + result.tax + result.register + result.writing + result.transferTax) + " " + rial);
        $("#totalView2").html(commaSeparator(150000 + result.tax + result.register * 2 + result.writing + result.transferTax) + " " + rial);
        $("#transferTaxLi").removeClass("d-none");
    } else {
        $("#transferTaxLi").addClass("d-none");
        if (result.other) {
            $("#totalView").html(commaSeparator(result.tax + result.register + result.writing) + " " + rial);
            $("#totalView2").html(commaSeparator(result.tax + result.register * 2 + result.writing) + " " + rial);
        } else {
            $("#totalView").html(commaSeparator(150000 + result.tax + result.register + result.writing) + " " + rial);
            $("#totalView2").html(commaSeparator(150000 + result.tax + result.register * 2 + result.writing) + " " + rial);
        }
    }
    $("#result-header,#result-body").removeClass("d-none");
}
