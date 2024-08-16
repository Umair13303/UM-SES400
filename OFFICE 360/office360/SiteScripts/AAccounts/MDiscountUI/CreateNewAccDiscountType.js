var OperationType = "";
var DB_OperationType = $('#HiddenFieldDB_OperationType').val();
var IsFieldClear = false;

$(document).ready(function () {
    ChangeCase();

    switch (DB_OperationType) {
        case PARAMETER.DB_OperationType.INSERT:
            $('#DivButtonSubmitDown').show();
            $('#DivButtonUpdateDown').hide();
            break;
        case PARAMETER.DB_OperationType.UPDATE:
            $('#DivButtonSubmitDown').hide();
            $('#DivButtonUpdateDown').show();
            break;
    }
});


//-----------ALL CHANGE CASES
function ChangeCase() {
    //-----------FOR ::EDIT CASE
    $('#DropDownListDiscountType').change(function () {
        if (!IsFieldClear) {
            IsFieldClear = true;
            ClearInputFields();
            IsFieldClear = false;
        }
    });


}

//-----------DB OPERATION CALL
function ValidateInputFields() {

    if ($('#TextBoxShortCode').RequiredTextBoxInputGroup() == false) {
        return false;
    }
    if ($('#TextBoxDescription').RequiredTextBoxInputGroup() == false) {
        return false;
    }
    if ($('#TextBoxRemarks').RequiredTextBoxInputGroup() == false) {
        return false;
    }
    return true;
}
$('#ButtonCheckDuplicate').click(function (event) {
    event.preventDefault();
    if ($('#TextBoxShortCode').RequiredTextBoxInputGroup() == false) {
        return false;
    }
    else {
        var ShortCode = $('#TextBoxShortCode').val();
        var JsonArg = {
            ActionCondition: PARAMETER.SESCondition.ISEXIST_MT_ACCDISCOUNTTYPE,
            ShortCode: ShortCode
        }
        $.ajax({
            type: "POST",
            url: BasePath + "/AAccounts/MFeeUI/Update_Insert_AccDiscountType",
            dataType: 'json',
            data: { 'PostedData': (JsonArg)},
            beforeSend: function () {
                startLoading();
            },
            success: function (data) {
                GetMessageBox(data.Message, data.Code);
            },
            complete: function () {
                stopLoading();
                ClearInputFields();
            },
            error: function (jqXHR, error, errorThrown) {
                GetMessageBox("The Transaction Can Not Be Performed Due To Serve Activity", 500);
            },
        });


    }

});
$('#ButtonSubmitDown').click(function (event) {
    event.preventDefault();
    var IsValid = ValidateInputFields();
    if (IsValid) {
        try {
            OperationType = PARAMETER.DB_OperationType.INSERT;

            UpSertDataIntoDB();
        }
        catch {
            alert(err);
            GetMessageBox(err, 500);
        }
    }
});
$('#ButtonUpdateDown').click(function (event) {
    event.preventDefault();
    var IsValid = ValidateInputFields();
    if (IsValid) {
        try {
            OperationType = PARAMETER.DB_OperationType.UPDATE;

            UpSertDataIntoDB();
        }
        catch {
            alert(err);
            GetMessageBox(err, 500);
        }
    }
});
function UpSertDataIntoDB() {
      
    $.ajax({
        type: "POST",
        url: BasePath + "/AAccounts/MFeeUI/Update_Insert_AccDiscountType",
        dataType: 'json',
        data: {
            //'PostedData': (JsonArg), 'PostedDataDetail': (FeeStructureDetailArray),
        },
        beforeSend: function () {
            startLoading();
        },
        success: function (data) {
            GetMessageBox(data.Message, data.Code);
        },
        complete: function () {
            stopLoading();
            ClearInputFields();
        },
        error: function (jqXHR, error, errorThrown) {
            GetMessageBox("The Transaction Can Not Be Performed Due To Serve Activity", 500);
        },
    });
}
function ClearInputFields() {
    $('.form-control').not('#DropDownListDiscountType').val('');
    $('.select2').not('#DropDownListDiscountType').val('-1').change();
    $('form').removeClass('Is-Valid');
}


//-----------LOAD ENTERY RECORD :: FEE TYPE SETTING
function GET_STRUCTUREFEETYPE_DETAILBYID() {
    var FeeTypeId = $('#DropDownListFeeType :selected').attr('data-FeeTypeGuId');
    if (FeeTypeId != null && FeeTypeId != undefined && FeeTypeId != "" && FeeTypeId != "-1") {

        var JsonArg = {
            GuID: FeeTypeId,
            ActionCondition: PARAMETER.SESCondition.GET_MT_STRUCTUREFEETYPE_DETAILBYID,
        }
        $.ajax({
            type: "POST",
            url: BasePath + "/AAccounts/MFeeUI/GET_DATA_BY_PARAMETER",
            dataType: 'json',
            data: { 'PostedData': (JsonArg) },
            beforeSend: function () {
                startLoading();
            },
            success: function (data) {
                if (data.length == undefined) {
                }
                else {
                    ClearOtherFeeSetting();
                    FeeSettingIsSecurity = data[0].IsSecurity;
                    FeeSettingIsRefundable = data[0].IsRefundable;
                    FeeSettingIsDiscount = data[0].IsDiscount;

                    if (FeeSettingIsSecurity == true && FeeSettingIsDiscount == true) {
                        $('#DivDropDownListRevenueAccount').hide();
                        $('#DivDropDownListAssetAccount').show();
                        $('#DivDropDownListLiabilityAccount').show();
                        $('#DivDropDownListCostOfSaleAccount').show();
                    }
                    else if (FeeSettingIsSecurity == false && FeeSettingIsDiscount == true) {
                        $('#DivDropDownListRevenueAccount').show();
                        $('#DivDropDownListAssetAccount').show();
                        $('#DivDropDownListLiabilityAccount').hide();
                        $('#DivDropDownListCostOfSaleAccount').show();
                    }
                    else if (FeeSettingIsSecurity == true && FeeSettingIsDiscount == false) {
                        $('#DivDropDownListRevenueAccount').hide();
                        $('#DivDropDownListAssetAccount').show();
                        $('#DivDropDownListLiabilityAccount').show();
                        $('#DivDropDownListCostOfSaleAccount').hide();
                    }
                    else if (FeeSettingIsSecurity == false && FeeSettingIsDiscount == false) {
                        $('#DivDropDownListRevenueAccount').show();
                        $('#DivDropDownListAssetAccount').show();
                        $('#DivDropDownListLiabilityAccount').hide();
                        $('#DivDropDownListCostOfSaleAccount').hide();
                    }


                }
            },
            complete: function () {
                stopLoading();
            },
        });
    }
    else {
        $('#DivDropDownListRevenueAccount').hide();
        $('#DivDropDownListAssetAccount').hide();
        $('#DivDropDownListLiabilityAccount').hide();
        $('#DivDropDownListCostOfSaleAccount').hide();
    }
}


//-----------LOAD ENTERY RECORD :: EDIT
$('#ButtonSubmitGetInfoForEdit').click(function () {
    ClearInputFields();
    if ($('#DropDownListDiscountType').RequiredDropdown() == false) {
        return;
    }
    else {

    }
});


