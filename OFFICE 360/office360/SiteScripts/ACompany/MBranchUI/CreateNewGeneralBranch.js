﻿var OperationType = "";
var DB_OperationType = $('#HiddenFieldDB_OperationType').val();
var IsFieldClear = false;

var StudyLevelIds = "";
var StudyGroupIds = "";
$(document).ready(function () {
    PopulateDropDownLists();
    ChangeCase();
    DB_OperationType = $('#HiddenFieldDB_OperationType').val();
    switch (DB_OperationType) {
        case PARAMETER.DB_OperationType.INSERT:
            $('#DivButtonSubmitDown').show();
            $('#DivButtonUpdateDown').hide();
            break;
        case PARAMETER.DB_OperationType.UPDATE:
            GET_GENERALBRACH_LISTBYPARAM();
            $('#DivButtonSubmitDown').hide();
            $('#DivButtonUpdateDown').show();
            break;
    }
});
function PopulateDropDownLists() {
    PopulateLK_CampusType_List();
    PopulateLK_OrganizationType_List();
    PopulateLK_Country_List();
    PopulateLK_PolicyPeriod_List();
    PopulateLK_ChallanMethod_List();
    PopulateLK_RollCallSystem_List();
    PopulateLK_BillingMethod_List();
    PopulateLK_StudyLevel_List();
    PopulateLK_StudyGroup_List();
}

//-----------ALL CHANGE CASES
function ChangeCase() {

    $('#DropDownListCountry').change(function () {
        PopulateLK_City_ListByParam();
    });
    $("#DropDownListStudyLevels").attr('data-width', '100%').select2({
        placeholder: 'Select an Option',
        multiple: true,
    }).change(function (event) {
        if (event.target == this) {
            StudyLevelIds = $(this).val();
        }
    });
    $("#DropDownListStudyGroups").attr('data-width', '100%').select2({
        placeholder: 'Select an Option',
        multiple: true,
    }).change(function (event) {
        if (event.target == this) {
            StudyGroupIds = $(this).val();
        }
    });

//-----------FOR ::EDIT CASE
   
    $('#DropDownListCampus').change(function () {
        if (!IsFieldClear) {
            IsFieldClear = true;
            ClearInputFields();
            IsFieldClear = false;
        }
    });
}

//-----------ALL DROPDOWN LIST
function PopulateLK_CampusType_List() {
    var JsonArg = {
        ActionCondition: PARAMETER.LookUpCondition.GET_LK1_CAMPUSTYPE,
    }
    $.ajax({
        type: "POST",
        url: BasePath + "/ACompany/MBranchUI/GET_DATA_BY_PARAMETER",
        data: { 'PostedData': (JsonArg) },
        beforeSend: function () {
            startLoading();
        },
        success: function (data) {
            var s = '<option  value="-1">Select an option</option>';
            for (var i = 0; i < data.length; i++) {
                s += '<option  value="' + data[i].Id + '">' + data[i].Description + '' + '</option>';
            }
            $("#DropDownListCampusType").html(s);
        },
        complete: function () {
            stopLoading();
        },
    });
}
function PopulateLK_OrganizationType_List() {
    var JsonArg = {
        ActionCondition: PARAMETER.LookUpCondition.GET_LK1_ORGANIZATIONTYPE,
    }
    $.ajax({
        type: "POST",
        url: BasePath + "/ACompany/MBranchUI/GET_DATA_BY_PARAMETER",
        data: { 'PostedData': (JsonArg) },
        beforeSend: function () {
            startLoading();
        },
        success: function (data) {
            var s = '<option  value="-1">Select an option</option>';
            for (var i = 0; i < data.length; i++) {
                s += '<option  value="' + data[i].Id + '">' + data[i].Description + '' + '</option>';
            }
            $("#DropDownListOrganizationType").html(s);

        },
        complete: function () {
            stopLoading();
        },
    });
}
function PopulateLK_Country_List() {
    var JsonArg = {
        ActionCondition: PARAMETER.LookUpCondition.GET_LK1_COUNTRY,
    }
    $.ajax({
        type: "POST",
        url: BasePath + "/ACompany/MBranchUI/GET_DATA_BY_PARAMETER",
        data: { 'PostedData': (JsonArg) },
        beforeSend: function () {
            startLoading();
        },
        success: function (data) {
            var s = '<option  value="-1">Select an option</option>';
            for (var i = 0; i < data.length; i++) {
                s += '<option  value="' + data[i].Id + '">' + data[i].Description + '' + '</option>';
            }
            $("#DropDownListCountry").html(s);
        },
        complete: function () {
            stopLoading();
        },
    });
}
function PopulateLK_City_ListByParam() {
    var CountryId = $("#DropDownListCountry :selected").val();
    var JsonArg = {
        CountryId: CountryId,
        ActionCondition: PARAMETER.LookUpCondition.GET_LK1_CITY_BYPARAMETER,
    }
    $.ajax({

        type: "POST",
        url: BasePath + "/ACompany/MBranchUI/GET_DATA_BY_PARAMETER",
        data: { 'PostedData': (JsonArg) },
        beforeSend: function () {
            startLoading();
        },
        success: function (data) {
            var s = '<option  value="-1">Select an option</option>';
            for (var i = 0; i < data.length; i++) {
                s += '<option  value="' + data[i].Id + '">' + data[i].Description + '' + '</option>';
            }
            $("#DropDownListCity").html(s);
        },
        complete: function () {
            stopLoading();
        },
    });

}
function PopulateLK_PolicyPeriod_List() {
    var JsonArg = {
        ActionCondition: PARAMETER.LookUpCondition.GET_LK1_POLICYPERIOD,
    }
    $.ajax({
        type: "POST",
        url: BasePath + "/ACompany/MBranchUI/GET_DATA_BY_PARAMETER",
        data: { 'PostedData': (JsonArg) },
        beforeSend: function () {
            startLoading();
        },
        success: function (data) {
            var s = '<option  value="-1">Select an option</option>';
            for (var i = 0; i < data.length; i++) {
                s += '<option  value="' + data[i].Id + '">' + data[i].Description + '' + '</option>';
            }
            $("#DropDownListPolicyPeriod").html(s);
        },
        complete: function () {
            stopLoading();
        },
    });
}
function PopulateLK_ChallanMethod_List() {
    var JsonArg = {
        ActionCondition: PARAMETER.LookUpCondition.GET_LK1_CHALLANMETHOD_BYPARAMTER,
        DB_IF_PARAM: PARAMETER.DB_IF_Condition.CHALLANMETHOD_LIST,
    }
    $.ajax({
        type: "POST",
        url: BasePath + "/ACompany/MBranchUI/GET_DATA_BY_PARAMETER",
        data: { 'PostedData': (JsonArg) },
        beforeSend: function () {
            startLoading();
        },
        success: function (data) {
            var s = '<option  value="-1">Select an option</option>';
            for (var i = 0; i < data.length; i++) {
                s += '<option  value="' + data[i].Id + '">' + data[i].Description + '' + '</option>';
            }
            $("#DropDownListChallanMethod").html(s);
        },
        complete: function () {
            stopLoading();
        },
    });
}
function PopulateLK_RollCallSystem_List() {
    var JsonArg = {
        ActionCondition: PARAMETER.LookUpCondition.GET_LK1_ROLLCALLSYSTEM,
    }
    $.ajax({
        type: "POST",
        url: BasePath + "/ACompany/MBranchUI/GET_DATA_BY_PARAMETER",
        data: { 'PostedData': (JsonArg) },
        beforeSend: function () {
            startLoading();
        },
        success: function (data) {
            var s = '<option  value="-1">Select an option</option>';
            for (var i = 0; i < data.length; i++) {
                s += '<option  value="' + data[i].Id + '">' + data[i].Description + '' + '</option>';
            }
            $("#DropDownListRollCallSystem").html(s);
        },
        complete: function () {
            stopLoading();
        },
    });
}
function PopulateLK_BillingMethod_List() {
    var JsonArg = {
        ActionCondition: PARAMETER.LookUpCondition.GET_LK1_BILLINGMETHOD,
    }
    $.ajax({
        type: "POST",
        url: BasePath + "/ACompany/MBranchUI/GET_DATA_BY_PARAMETER",
        data: { 'PostedData': (JsonArg) },
        beforeSend: function () {
            startLoading();
        },
        success: function (data) {
            var s = '<option  value="-1">Select an option</option>';
            for (var i = 0; i < data.length; i++) {
                s += '<option  value="' + data[i].Id + '">' + data[i].Description + '' + '</option>';
            }
            $("#DropDownListBillingMethod").html(s);
        },
        complete: function () {
            stopLoading();
        },
    });
}
function PopulateLK_StudyLevel_List() {
    var JsonArg = {
        ActionCondition: PARAMETER.LookUpCondition.GET_LK1_STUDYLEVEL_BYPARAMTER,
        DB_IF_PARAM: PARAMETER.DB_IF_Condition.STUDYLEVEL_LIST,
    }
    $.ajax({
        type: "POST",
        url: BasePath + "/ACompany/MBranchUI/GET_DATA_BY_PARAMETER",
        data: { 'PostedData': (JsonArg) },
        beforeSend: function () {
            startLoading();
        },
        success: function (data) {
            var s = '<option  value="-1">Select an option</option>';
            for (var i = 0; i < data.length; i++) {
                s += '<option  value="' + data[i].Id + '">' + data[i].Description + '' + '</option>';
            }
            $("#DropDownListStudyLevels").html(s);
        },
        complete: function () {
            stopLoading();
        },
    });
}
function PopulateLK_StudyGroup_List() {
    var JsonArg = {
        ActionCondition: PARAMETER.LookUpCondition.GET_LK1_STUDYGROUP_BYPARAMTER,
        DB_IF_PARAM: PARAMETER.DB_IF_Condition.STUDYGROUP_LIST,
    }
    $.ajax({
        type: "POST",
        url: BasePath + "/ACompany/MBranchUI/GET_DATA_BY_PARAMETER",
        data: { 'PostedData': (JsonArg) },
        beforeSend: function () {
            startLoading();
        },
        success: function (data) {
            var s = '<option  value="-1">Select an option</option>';
            for (var i = 0; i < data.length; i++) {
                s += '<option  value="' + data[i].Id + '">' + data[i].Description + '' + '</option>';
            }
            $("#DropDownListStudyGroups").html(s);
        },
        complete: function () {
            stopLoading();
        },
    });
}

//-----------DB OPERATION CALL
function ValidateInputFields() {

    if ($('#TextBoxDescription').RequiredTextBoxInputGroup() == false) {
        return false;
    }
    if ($('#DropDownListCampusType').RequiredDropdown() == false) {
        return false;
    }
    if ($('#DropDownListOrganizationType').RequiredDropdown() == false) {
        return false;
    }
    if ($('#DropDownListCountry').RequiredDropdown() == false) {
        return false;
    }
    if ($('#DropDownListCity').RequiredDropdown() == false) {
        return false;
    }
    if ($('#TextBoxAddress').RequiredTextBoxInputGroup() == false) {
        return false;
    }
    if ($('#TextBoxContactNo').RequiredTextBoxInputGroup() == false) {
        return false;
    }
    if ($('#TextBoxEmailAddress').RequiredTextBoxInputGroup() == false) {
        return false;
    }
    if ($('#DropDownListPolicyPeriod').RequiredDropdown() == false) {
        return false;
    }
    if ($('#DropDownListChallanMethod').RequiredDropdown() == false) {
        return false;
    }

    if ($('#DropDownListRollCallSystem').RequiredDropdown() == false) {
        return false;
    }
    if ($('#DropDownListBillingMethod').RequiredDropdown() == false) {
        return false;
    }
    if ($('#DropDownListStudyLevels').RequiredDropdown() == false) {
        return false;
    }
    if ($('#DropDownListStudyGroups').RequiredDropdown() == false) {
        return false;
    }
    if ($('#TextBoxNTNNo').RequiredTextBoxInputGroup() == false) {
        return false;
    }
    if ($('#TextBoxRemarks').RequiredTextBoxInputGroup() == false) {
        return false;
    }
    return true;
}

$('#ButtonSubmitDown').click(function (event) {
    event.preventDefault();
    var IsValid = ValidateInputFields();
    if (IsValid) {
        try {
            OperationType = PARAMETER.DB_OperationType.INSERT;
            UpSertDataIntoDB();
        }
        catch {
            GetMessageBox(err, 505);
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
            GetMessageBox(err, 505);
        }
    }
});
function UpSertDataIntoDB() {
    var Description = $('#TextBoxDescription').val();
    var CampusTypeId = $('#DropDownListCampusType :selected').val();
    var OrganizationTypeId = $('#DropDownListOrganizationType :selected').val();
    var CountryId = $('#DropDownListCountry :selected').val();
    var CityId = $('#DropDownListCity :selected').val();
    var Address = $('#TextBoxAddress').val();
    var ContactNo = $('#TextBoxContactNo').val();
    var EmailAddress = $('#TextBoxEmailAddress').val();
    var PolicyPeriodId = $('#DropDownListPolicyPeriod :selected').val();
    var ChallanMethodId = $('#DropDownListChallanMethod :selected').val();
    var RollCallSystemId = $('#DropDownListRollCallSystem :selected').val();
    var BillingMethodId = $('#DropDownListBillingMethod :selected').val();
    var NTNNo = $('#TextBoxNTNNo').val();
    var Remarks = $('#TextBoxRemarks').val();

    var CampusGuID = $('#HiddenFieldCampusGuID').val();

    var JsonArg = {
        GuID: CampusGuID,
        OperationType: OperationType,
        CompanyId: CompanyId,
        Description: Description,
        CampusTypeId: CampusTypeId,
        OrganizationTypeId: OrganizationTypeId,
        CountryId: CountryId,
        CityId: CityId,
        Address: Address,
        ContactNo: ContactNo,
        EmailAddress: EmailAddress,
        ChallanMethodId: ChallanMethodId,
        PolicyPeriodId: PolicyPeriodId,
        RollCallSystemId: RollCallSystemId,
        BillingMethodId: BillingMethodId,
        StudyLevelIds: StudyLevelIds.toString(),
        StudyGroupIds: StudyGroupIds.toString(),
        NTNNo: NTNNo,
        Remarks: Remarks,
    }
    $.ajax({
        type: "POST",
        url: BasePath + "/ACompany/MBranchUI/UpSert_Into_GeneralBranch",
        dataType: 'json',
        data: { 'PostedData': (JsonArg) },
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
    //-----------NOT CLEARING REQUIRED FIELD
    $('.form-control').not('#DropDownListCampus').val('');
    $('.select2').not('#DropDownListCampus').val('-1').change();
    $('form').removeClass('Is-Valid');
}


//-----------LOAD ENTERY RECORD :: EDIT

$('#ButtonSubmitGetInfoForEdit').click(function () {
    if ($('#DropDownListCampus').RequiredDropdown() == false) {
        return false;
    }
    else {
        GET_GENERALBRANCH_DETAILBYID();
    }
});
function GET_GENERALBRACH_LISTBYPARAM() {
    var JsonArg = {
        ActionCondition: PARAMETER.SESCondition.GET_MT_GENERALBRANCH_BYPARAMETER,
        DB_IF_PARAM: PARAMETER.DB_IF_Condition.BRANCH_BY_USER_ALLOWEDBRANCHIDS,
    }
    $.ajax({

        type: "POST",
        url: BasePath + "/ACompany/MBranchUI/GET_DATA_BY_PARAMETER",
        data: { 'PostedData': (JsonArg) },
        beforeSend: function () {
            startLoading();
        },
        success: function (data) {
            var s = '<option  value="-1">Select an option</option>';
            for (var i = 0; i < data.length; i++) {
                s += '<option  value="' + data[i].Id + '">' + data[i].Description + '' + '</option>';
            }
            $("#DropDownListCampus").html(s);
            if (RoleId == Roles.RoleID_ADMIN || RoleId == Roles.RoleID_DEVELOPER) {
                $("#DropDownListCampus").prop('disabled', Status.Close);
            }
            else {
                $("#DropDownListCampus").prop('disabled', Status.Open);
            }
        },
        complete: function () {
            $("#DropDownListCampus").val(BranchId).change();

            stopLoading();
        },
    });
}
function GET_GENERALBRANCH_DETAILBYID() {
    var CampusId = $('#DropDownListCampus :selected').val();
    if (CampusId != null && CampusId != undefined && CampusId != "" && CampusId != "-1") {

        var JsonArg = {
            Id: CampusId,
            ActionCondition: PARAMETER.SESCondition.GET_MT_GENERALBRANCH_DETAILBYID,
        }
        $.ajax({
            type: "POST",
            url: BasePath + "/ACompany/MBranchUI/GET_DATA_BY_PARAMETER",
            dataType: 'json',
            data: { 'PostedData': (JsonArg) },
            beforeSend: function () {
                startLoading();
            },
            success: function (data) {
                $('#TextBoxDescription').val(data[0].Description);
                $('#DropDownListCampusType').val(data[0].CampusTypeId).change();
                $('#DropDownListOrganizationType').val(data[0].OrganizationTypeId).change();
                $('#DropDownListCountry').val(data[0].CountryId).change();
                setTimeout(function () {
                    $('#DropDownListCity').val(data[0].CityId).change();
                }, 500); 
                $('#TextBoxAddress').val(data[0].Address);
                $('#TextBoxContactNo').val(data[0].ContactNo);
                $('#TextBoxEmailAddress').val(data[0].EmailAddress);
                $('#DropDownListPolicyPeriod').val(data[0].PolicyPeriodId).change().prop('disabled',true);
                $('#DropDownListChallanMethod').val(data[0].ChallanMethodId).change().prop('disabled',true);
                $('#DropDownListRollCallSystem').val(data[0].RollCallSystemId).change().prop('disabled', true);
                $('#DropDownListBillingMethod').val(data[0].BillingMethodId).change().prop('disabled',true);
                $('#DropDownListStudyLevels').val(data[0].StudyLevelIds).change().prop('disabled',true);
                $('#DropDownListStudyGroups').val(data[0].StudyGroupIds).change().prop('disabled',true);
                $('#TextBoxNTNNo').val(data[0].NTNNo);
                $('#TextBoxRemarks').val(data[0].Remarks).prop('disabled', true);
                $('#HiddenFieldCampusGuID').val(data[0].GuID);

            },
            complete: function () {

                stopLoading();
            },
        });


    }
    else {
        GetMessageBox("Please Select A Branch", 505);
        return;
    }
};