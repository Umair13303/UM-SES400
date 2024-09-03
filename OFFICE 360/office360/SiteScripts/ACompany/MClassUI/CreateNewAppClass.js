
var OperationType = "";
var DB_OperationType = $('#HiddenFieldDB_OperationType').val();
var IsFieldClear = false;

$(document).ready(function () {
    switch (DB_OperationType) {

        case PARAMETER.DB_OperationType.INSERT:

            $('#DivButtonSubmitDown').show();
            $('#DivButtonUpdateDown').hide();
            break;

        case PARAMETER.DB_OperationType.UPDATE:
            GET_STRUCTUREFEETYPE_LISTBYPARAM();
            $('#DivButtonSubmitDown').hide();
            $('#DivButtonUpdateDown').show();
            break;
    }
    PopulateDropDownLists();
    ChangeCase();
});


function PopulateDropDownLists() {
    PopulateMT_GeneralBranch_ListByParam();
}

function ChangeCase() {
    //-----------FOR ::EDIT CASE
    $('#DropDownListClass').change(function () {
        if (!IsFieldClear) {
            IsFieldClear = true;
            ClearInputFields();
            IsFieldClear = false;
        }
    });
    $('#DropDownListCampus').change(function () {
        PopulateLK_StudyGroup_List();
        PopulateLK_StudyLevel_List();
    });
}

//-----------ALL DROPDOWN LIST
function PopulateMT_GeneralBranch_ListByParam() {
    var JsonArg = {
        DB_IF_PARAM: PARAMETER.DB_IF_Condition.BRANCH_BY_USER_ALLOWEDBRANCHIDS,
    }
    $.ajax({
        type: "POST",
        url: BasePath + "/ACompany/MClassUI/GET_MT_GENERALBRANCH_BYPARAMETER",
        data: { 'PostedData': (JsonArg) },
        beforeSend: function () {
            startLoading();
        },
        success: function (data) {
            var s = '<option value="-1">Select an option</option>';
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
            $('#DropDownListCampus').val(BranchId).change();
            stopLoading();
        },
    });
}
function PopulateLK_StudyGroup_List() {
    var CampusId = $('#DropDownListCampus :selected').val();
    var JsonArg = {
        CampusId: CampusId,
        DB_IF_PARAM: PARAMETER.DB_IF_Condition.STUDYGROUP_BY_BRANCHSETTING,
    }
    $.ajax({
        type: "POST",
        url: BasePath + "/ACompany/MClassUI/GET_LK1_STUDYGROUP_BYPARAMTER",
        data: { 'PostedData': (JsonArg) },
        beforeSend: function () {
            startLoading();
        },
        success: function (data) {
            var s = '<option  value="-1">Select an option</option>';
            for (var i = 0; i < data.length; i++) {
                s += '<option  value="' + data[i].Id + '">' + data[i].Description + '' + '</option>';
            }
            $("#DropDownListStudyGroup").html(s);
        },
        complete: function () {
            stopLoading();
        },
    });
}
function PopulateLK_StudyLevel_List() {
    var CampusId = $('#DropDownListCampus :selected').val();
    var JsonArg = {
        CampusId: CampusId,
        DB_IF_PARAM: PARAMETER.DB_IF_Condition.STUDYLEVEL_BY_BRANCHSETTING,
    }
    $.ajax({
        type: "POST",
        url: BasePath + "/ACompany/MClassUI/GET_LK1_STUDYLEVEL_BYPARAMTER",
        data: { 'PostedData': (JsonArg) },
        beforeSend: function () {
            startLoading();
        },
        success: function (data) {
            var s = '<option  value="-1">Select an option</option>';
            for (var i = 0; i < data.length; i++) {
                s += '<option  value="' + data[i].Id + '">' + data[i].Description + '' + '</option>';
            }
            $("#DropDownListStudyLevel").html(s);
        },
        complete: function () {
            stopLoading();
        },
    });
}


//-----------DB OPERATION CALL
$('#ButtonSubmitDown').click(function (event) {
    event.preventDefault();
    var IsValid = ValidateInputFields();
    if (IsValid) {
        try {
            OperationType = PARAMETER.DB_OperationType.INSERT;
            UpSertDataIntoDB();
        }
        catch {
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
            GetMessageBox(err, 500);
        }
    }
});

function ValidateInputFields() {
    if ($('#DropDownListCampus').RequiredDropdown() == false) {
        return false;
    }
    if ($('#TextBoxDescription').RequiredTextBoxInputGroup() == false) {
        return false;
    }
    if ($('#DropDownListStudyLevel').RequiredDropdown() == false) {
        return false;
    }
    if ($('#DropDownListStudyGroup').RequiredDropdown() == false) {
        return false;
    }
    return true;
}
function UpSertDataIntoDB() {
    var CampusId = $('#DropDownListCampus :selected').val();
    var Description = $('#TextBoxDescription').val();
    var StudyGroupId = $('#DropDownListStudyGroup :selected').val();
    var StudyLevelId = $('#DropDownListStudyLevel :selected').val();

    var ClassGuID = $('#HiddenFieldClassGuID').val();

    var JsonArg = {
        GuID: ClassGuID,
        OperationType: OperationType,
        CampusId: CampusId,
        Description: Description,
        StudyLevelId: StudyLevelId,
        StudyGroupId: StudyGroupId,
    }
    $.ajax({
        type: "POST",
        url: BasePath + "/ACompany/MClassUI/UpSert_Into_AppClass",
        dataType: 'json',
        data: { 'PostedData': (JsonArg) },
        beforeSend: function () {
            startLoading();
        },
        success: function (data) {
            GetMessageBox(data.Message, data.Code);
            ClearInputFields();

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

    $('.form-control').not('#DropDownListClass').val('');
    $('.select2').not('#DropDownListClass').val('-1').change();
    $('form').removeClass('Is-Valid');
}
