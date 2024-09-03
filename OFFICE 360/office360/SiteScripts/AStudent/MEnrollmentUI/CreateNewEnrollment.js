var OperationType = "";
var DB_OperationType = $('#HiddenFieldDB_OperationType').val();
var IsFieldClear = false;

var table = "";
$(document).ready(function () {
    InitDataTable();
    PopulateDropDownLists();
    ChangeCase();

});



//-----------ALL DATA TABLE
function InitDataTable() {
    table = $('#MainTableFeeChallanDetail').DataTable({
        "responsive": true, "ordering": false,
        "processing": true, "pagination": false,
        "paging": false,
        "columns": [
            { "title": "#", "orderable": false, },
            { "title": "Description" },
            { "title": "Amount (PKR)" },
            { "title": "Discount" },
            { "title": "Remaining" },
        ],
        "columnDefs": [
        ],
    });
    table.on('order.dt search.dt', function () {
        table.column(0, { search: 'applied', order: 'applied' }).nodes().each(function (cell, i) {
            cell.innerHTML = i + 1;
        });

    }).draw();
}
function GET_ACCFEESTRUCTUREDETAIL_DETAILBYID() {
    var FeeStructureId = $('#DropDownListFeeStructure :selected').attr('data-Id');
    var SessionId = $('#DropDownListSession :selected').val();
    var ClassId = $('#DropDownListClass :selected').val();
    if (FeeStructureId != null && FeeStructureId != undefined && FeeStructureId != "" && FeeStructureId != "-1") {
        var JsonArg = {
            DB_IF_PARAM: PARAMETER.DB_IF_Condition.ACCFEESTRUCTURE_GET_INFO_NEW_STUDENT,
            FeeStructureId: FeeStructureId,
            SessionId: SessionId,
            ClassId: ClassId,
        }
        $.ajax({
            type: "POST",
            url: BasePath + "/AStudent/MEnrollmentUI/GET_MT_ACCFEESTRUCTUREDETAIL_BYPARAMETER",
            data: { 'PostedData': (JsonArg) },
            beforeSend: function () {
                startLoading();
            },
            success: function (data) {
                table.clear().draw();

                if (data.length > 0) {
                    for (var i in data) {
                        var row_data = [];
                        row_data[0] = '';
                        row_data[1] = data[i].FeeName;
                        row_data[2] = data[i].FeeAmount;
                        row_data[3] = "<input Id='TextBoxDiscount" + (i + 1) + "' type='text' class='form-control form-control-sm' disabled='' value='" + data[i].FeeAmount + "'/>";;
                        row_data[4] = row_data[2] - row_data[2];

                        table.row.add(row_data);
                    }
                    table.draw();
                }
            },
            complete: function () {
                stopLoading();
            },
        });

    }
}

function PopulateDropDownLists() {
    PopulateMT_GeneralBranch_ListByParam();
    PopulateLK_AdmissionCatagory_List();
    PopulateLK_Religion_List();
    PopulateLK_Country_List();
    PopulateLK_Occupation_List();

}

//-----------ALL CHANGE CASES
function ChangeCase() {
    $('#DropDownListCampus').change(function (event) {
        event.preventDefault();
        $('#DropDownListSession').val('-1').change();

        var CampusId = $('#DropDownListCampus :selected').val();
        if (CampusId != null && CampusId != undefined && CampusId != "" && CampusId != "-1") {
            PopulateMT_AppSession_ListByParam();
        }

    });
    $('#DropDownListSession').change(function (event) {
        event.preventDefault();
        $('#DropDownListClass').val('-1').change();

        var SessionId = $('#DropDownListSession :selected').val();
        if (SessionId != null && SessionId != undefined && SessionId != "" && SessionId != "-1") {
            PopulateMT_AppSessionDetail_ListByParam();
            PopulateMT_AppClass_ListByParam();
        }
    });

    $('#DropDownListClass').change(function (event) {
        event.preventDefault();
        var ClassId = $('#DropDownListClass :selected').val();
        if (ClassId != null && ClassId != undefined && ClassId != "" && ClassId != "-1") {
            CHECK_FEESTRUCTURE_FOR_CLASS();
            PopulateMT_AccFeeStructure_ListByParam();
        }
    });
    $('#DropDownListFeeStructure').change(function (event) {
        event.preventDefault();
        var FeeStructureId = $('#DropDownListFeeStructure :selected').val();
        if (FeeStructureId != null && FeeStructureId != undefined && FeeStructureId != "" && FeeStructureId != "-1") {
            GET_ACCFEESTRUCTUREDETAIL_DETAILBYID();
        }
    });
   

}
//-----------ALL DROPDOWN LIST
function PopulateMT_GeneralBranch_ListByParam() {
    var JsonArg = {
        DB_IF_PARAM: PARAMETER.DB_IF_Condition.BRANCH_BY_USER_ALLOWEDBRANCHIDS,
    }
    $.ajax({

        type: "POST",
        url: BasePath + "/AStudent/MEnrollmentUI/GET_MT_GENERALBRANCH_BYPARAMETER",
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
function PopulateMT_AppSession_ListByParam() {
    var CampusId = $('#DropDownListCampus :selected').val();
    var JsonArg = {
        DB_IF_PARAM: PARAMETER.DB_IF_Condition.APPSESSION_BY_GENERALBRANCH,
        CampusId: CampusId,
    }
    $.ajax({
        type: "POST",
        url: BasePath + "/AStudent/MEnrollmentUI/GET_MT_APPSESSION_BYPARAMETER",
        data: { 'PostedData': (JsonArg) },
        beforeSend: function () {
            startLoading();
        },
        success: function (data) {
            var s = '<option  value="-1">Select an option</option>';
            for (var i = 0; i < data.length; i++) {
                s += '<option ' +
                    'data-ClassIds="' + data[i].ClassIds + '" ' +
                    'value="' + data[i].Id + '">' + data[i].Description +
                    '</option>';
            }
            $("#DropDownListSession").html(s);

        },
        complete: function () {
            stopLoading();
        },
    });
}
function PopulateMT_AppSessionDetail_ListByParam() {

    var SessionId = $('#DropDownListSession :selected').val();

    var JsonArg = {
        DB_IF_PARAM: PARAMETER.DB_IF_Condition.APPSESSIONDETAIL_BY_APPSESSION,
        SessionId: SessionId,
    }
    $.ajax({
        type: "POST",
        url: BasePath + "/AStudent/MEnrollmentUI/GET_MT_APPSESSIONDETAIL_BYPARAMETER",
        data: { 'PostedData': (JsonArg) },
        beforeSend: function () {
            startLoading();
        },
        success: function (data) {
            var s = '<option value="-1">Select an option</option>';
            for (var i = 0; i < data.length; i++) {
                s += '<option value="' + data[i].Id + '">' + data[i].Description + '</option>';
            }
            $("#DropDownListRegisteredPeriod").html(s);
        },
        complete: function () {
            stopLoading();
        },

    });

};
function PopulateMT_AppClass_ListByParam() {

    var CampusId = $('#DropDownListCampus :selected').val();
    var ClassIds = $('#DropDownListSession :selected').attr('data-ClassIds');

    var JsonArg = {
        DB_IF_PARAM: PARAMETER.DB_IF_Condition.APPCLASS_BY_APPSESSION,
        CampusId: CampusId,
        ClassIds: ClassIds,
    }
    $.ajax({
        type: "POST",
        url: BasePath + "/AStudent/MEnrollmentUI/GET_MT_APPCLASS_BYPARAMETER",
        data: { 'PostedData': (JsonArg) },
        beforeSend: function () {
            startLoading();
        },
        success: function (data) {
            var s = '<option value="-1">Select an option</option>';
            for (var i = 0; i < data.length; i++) {
                s += '<option value="' + data[i].Id + '">' + data[i].Description + '</option>';
            }
            $("#DropDownListClass").html(s);
        },
        complete: function () {
            stopLoading();
        },

    });

};
function PopulateMT_AccFeeStructure_ListByParam() {
    var DB_Condition = PARAMETER.DB_IF_Condition.ACCFEESTRUCTURE_BY_APPCLASS
    var CampusId = $('#DropDownListCampus :selected').val();
    var SessionId = $('#DropDownListSession :selected').val();
    var ClassId = $('#DropDownListClass :selected').val();
    var JsonArg = {
        CampusId: CampusId,
        SessionId: SessionId,
        ClassId: ClassId,
        DB_IF_PARAM: DB_Condition,
    }
    $.ajax({
        type: "POST",
        url: BasePath + "/AStudent/MEnrollmentUI/GET_MT_ACCFEESTRUCTURE_BYPARAMETER",
        data: { 'PostedData': (JsonArg) },
        beforeSend: function () {
            startLoading();
        },
        success: function (data) {
            var s = '<option  value="-1">Select an option</option>';
            for (var i = 0; i < data.length; i++) {
                s += '<option ' +
                    'data-Id="' + data[i].Id + '" ' +
                    'value="' + data[i].GuID + '">' + data[i].Description +
                    '</option>';
            }
            $("#DropDownListFeeStructure").html(s);
        },
        complete: function () {
            stopLoading();
        },
    });
}
function PopulateLK_AdmissionCatagory_List() {
    var JsonArg = {
    }
    $.ajax({
        type: "POST",
        url: BasePath + "/AStudent/MEnrollmentUI/GET_LK1_ADMISSIONCATAGORY",
        data: { 'PostedData': (JsonArg) },
        beforeSend: function () {
            startLoading();
        },
        success: function (data) {
            var s = '<option  value="-1">Select an option</option>';
            for (var i = 0; i < data.length; i++) {
                s += '<option  value="' + data[i].Id + '">' + data[i].Description + '' + '</option>';
            }
            $("#DropDownListAdmissionCatagory").html(s);
        },
        complete: function () {
            stopLoading();
        },
    });
}
function PopulateLK_Religion_List() {
    var JsonArg = {
    }
    $.ajax({
        type: "POST",
        url: BasePath + "/AStudent/MEnrollmentUI/GET_LK1_RELIGION",
        data: { 'PostedData': (JsonArg) },
        beforeSend: function () {
            startLoading();
        },
        success: function (data) {
            var s = '<option  value="-1">Select an option</option>';
            for (var i = 0; i < data.length; i++) {
                s += '<option  value="' + data[i].Id + '">' + data[i].Description + '' + '</option>';
            }
            $("#DropDownListReligion").html(s);
        },
        complete: function () {
            stopLoading();
        },
    });
}
function PopulateLK_Country_List() {
    var JsonArg = {
    }
    $.ajax({
        type: "POST",
        url: BasePath + "/AStudent/MEnrollmentUI/GET_LK1_COUNTRY",
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
function PopulateLK_Occupation_List() {
    var JsonArg = {
    }
    $.ajax({
        type: "POST",
        url: BasePath + "/AStudent/MEnrollmentUI/GET_LK1_OCCUPATION",
        data: { 'PostedData': (JsonArg) },
        beforeSend: function () {
            startLoading();
        },
        success: function (data) {
            var s = '<option  value="-1">Select an option</option>';
            for (var i = 0; i < data.length; i++) {
                s += '<option  value="' + data[i].Id + '">' + data[i].Description + '' + '</option>';
            }
            $("#DropDownListOccupation").html(s);
        },
        complete: function () {
            stopLoading();
        },
    });
}



// VALIDATE INPUT FIELDS
function ValidateInputFields() {
    debugger
    if ($('#TextBoxFirstName').RequiredTextBoxInputGroup() == false) {
        return false;
    }
    if ($('#TextBoxLastName').RequiredTextBoxInputGroup() == false) {
        return false;
    }
    if ($('#TextBoxDateofBirth').RequiredTextBoxInputGroup() == false) {
        return false;
    }
    if ($('#TextBoxCnicNo_FormBNo').RequiredTextBoxInputGroup() == false) {
        return false;
    }
    if ($('#DropDownListGender').RequiredDropdown() == false) {
        return false;
    }
    if ($('#DropDownListMartialStatus').RequiredDropdown() == false) {
        return false;
    }
    if ($('#DropDownListReligion').RequiredDropdown() == false) {
        return false;
    }
    if ($('#DropDownListNationality').RequiredDropdown() == false) {
        return false;
    }
    if ($('#TextBoxResedenitalAddress').RequiredTextBoxInputGroup() == false) {
        return false;
    }
    if ($('#TextBoxMobileNumber').RequiredTextBoxInputGroup() == false) {
        return false;
    }
    if ($('#TextBoxEmailAddress').RequiredTextBoxInputGroup() == false) {
        return false;
    }
    if ($('#TextBoxParentName').RequiredTextBoxInputGroup() == false) {
        return false;
    }
    if ($('#TextBoxParentNICNo').RequiredTextBoxInputGroup() == false) {
        return false;
    }
    if ($('#DropDownListParentStudyLevel').RequiredDropdown() == false) {
        return false;
    }
    if ($('#DropDownListOccupation').RequiredDropdown() == false) {
        return false;
    }
    if ($('#DropDownListRelationship').RequiredDropdown() == false) {
        return false;
    }
    if ($('#TextBoxMonthlyIncome').RequiredTextBoxInputGroup() == false) {
        return false;
    }
    if ($('#DropDownListClass').RequiredDropdown() == false) {
        return false;
    }
    return true;
}

// CLEAR ALL FIELDS
function ClearInputFields() {

    $('.form-control').val('');
    $('.select2').val('-1').change();
    $('form').removeClass('Is-Valid');
}
// CLICK FUNCTION
$('#ButtonSubmitDown').click(function (event) {
    event.preventDefault();
    var IsValid = ValidateInputFields();
    if (IsValid) {
        try {
            var OperationType = 1;
            InsertData(OperationType);
        }
        catch (err) {
            GetMessageBox(err, 500);

        }
    }
});
// INSERT FUNCTION
function InsertData(OperationType) {
    var FirstName = $('#TextBoxFirstName').val();
    var LastName = $('#TextBoxLastName').val();
    var DateofBirth = $('#TextBoxDateofBirth').val();
    var CnicNo_FormBNo = $('#TextBoxCnicNo_FormBNo').val();
    var GenderId = $('#DropDownListGender :selected').val();
    var MartialStatusId = $('#DropDownListMartialStatus :selected').val();
    var ReligionId = $('#DropDownListReligion :selected').val();
    var NationalityId = $('#DropDownListNationality :selected').val();
    var ResedenitalAddress = $('#TextBoxResedenitalAddress').val();
    var MobileNumber = $('#TextBoxMobileNumber').val();
    var EmailAddress = $('#TextBoxEmailAddress').val();
    var ParentName = $('#TextBoxParentName').val();
    var ParentNICNo = $('#TextBoxParentNICNo').val();
    var ParentStudyLevelId = $('#DropDownListParentStudyLevel :selected').val();
    var OccupationId = $('#DropDownListOccupation :selected').val();
    var RelationshipId = $('#DropDownListRelationship :selected').val();
    var MonthlyIncome = $('#TextBoxMonthlyIncome').val();
    var ClassId = $('#DropDownListClass :selected').val();
    var SessionId = $('#HiddenFieldSessionId').val();
    HiddenFieldSessionId

    var JsonArg = {
        FirstName: FirstName,
        LastName: LastName,
        DateofBirth: DateofBirth,
        CnicNo_FormBNo: CnicNo_FormBNo,
        GenderId: GenderId,
        MartialStatusId: MartialStatusId,
        ReligionId: ReligionId,
        NationalityId: NationalityId,
        ResedenitalAddress: ResedenitalAddress,
        MobileNumber: MobileNumber,
        EmailAddress: EmailAddress,
        ParentName: ParentName,
        ParentNICNo: ParentNICNo,
        ParentStudyLevelId: ParentStudyLevelId,
        OccupationId: OccupationId,
        RelationshipId: RelationshipId,
        MonthlyIncome: MonthlyIncome,
        ClassId: ClassId,
        SessionId: SessionId,
    }
    
    $.ajax({
        type: "POST",
        url: BasePath + "/AStudent/MEnrollmentUI/Insert_AppStudent",
        dataType: 'json',
        data: { 'PostedData': (JsonArg) },
        beforeSend: function () {
            debugger
            startLoading();
        },
        success: function (data) {
            //SAVE 
            if (OperationType == 1) {
                GetMessageBox(data.Message, data.Code);
                ClearInputFields();
            }
            //SAVE AND NEW
        },
        complete: function () {
            stopLoading();
        },
        error: function (jqXHR, error, errorThrown) {
            GetMessageBox("The Transaction Can Not Be Performed Due To Serve Activity", 500);

        },
    });
}


//-----------LOAD ENTERY RECORD :: IF ALREAR EXIST
function CHECK_FEESTRUCTURE_FOR_CLASS() {
    var SessionId = $('#DropDownListSession :selected').val();
    var ClassId = $('#DropDownListClass :selected').val();
    var JsonArg = {
        SessionId: SessionId,
        ClassId: ClassId,
    }

    $.ajax({
        type: "POST",
        url: BasePath + "/AStudent/MEnrollmentUI/CHECK_FEESTRUCTURE_FOR_CLASS",
        data: { 'PostedData': (JsonArg) },
        beforeSend: function () {
            startLoading();
        },
        success: function (data) {
            if ((data.length < 0) || (data.length == 0) || (data == undefined)) {
                GetMessageBox("No Fee Found For Selected Class", 500);
                return;
            }
        },
        complete: function () {
            stopLoading();
        },
    });
}