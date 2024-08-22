using office360.Common.CommonHelper;
using office360.Extensions;
using office360.Models.EDMX;
using office360.Models.General;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity.Core.Objects;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using static office360.Models.General.DocumentStatus;
using static office360.Models.General.HttpStatus;
using static office360.Models.General.DBListCondition;
using DocumentStatus = office360.Models.General.DocumentStatus;

namespace office360.Common.DataBaseProcedures.ACompany
{
    public class InsertIntoDB
    {
        public static int? Update_Insert_GeneralBranch(_SqlParameters PostedData)
        {
            using (var db = new SESEntities())
            {
                using (System.Data.Entity.DbContextTransaction dbTran = db.Database.BeginTransaction())
                {
                    try
                    {
                        #region DB SETTING
                        if (PostedData.OperationType == nameof(DB_OperationType.INSERT_DATA_INTO_DB))
                        {
                            PostedData.GuID = Uttility.fn_GetHashGuid();
                        }
                        #endregion
                        #region OUTPUT VARAIBLE
                        var ResponseParameter = new ObjectParameter("Response", typeof(int));
                        var CampusIdParameter = new ObjectParameter("CampusId", typeof(int));
                        #endregion
                        #region EXECUTE STORE PROCEDURE
                        var GeneralBranch = db.GeneralBranch_UpSert(
                                                             PostedData.OperationType,
                                                             PostedData.GuID,
                                                             PostedData.Description,
                                                             PostedData.CampusTypeId,
                                                             PostedData.OrganizationTypeId,
                                                             PostedData.CountryId,
                                                             PostedData.CityId,
                                                             PostedData.Address.ToSafeString(),
                                                             PostedData.ContactNo.ToSafeString(),
                                                             PostedData.EmailAddress.ToSafeString(),
                                                             PostedData.NTNNo.ToSafeString(),
                                                             PostedData.Remarks.ToSafeString(),
                                                             DateTime.Now,
                                                             Session_Manager.UserId,
                                                             DateTime.Now,
                                                             Session_Manager.UserId,
                                                             (int?)DocumentStatus.DocStatus.Working_BRANCHES,
                                                             (int?)DocumentStatus.DocType.BRANCHES,
                                                             true,
                                                             Session_Manager.BranchId,
                                                             Session_Manager.CompanyId,
                                                             ResponseParameter,
                                                             CampusIdParameter
                            );
                        int? CampusId = (int)CampusIdParameter.Value;

                        var GeneralBranchSetting = db.GeneralBranchSetting_UpSert(
                                                                                    PostedData.OperationType,
                                                                                    Uttility.fn_GetHashGuid(),
                                                                                    CampusId,
                                                                                    PostedData.RollCallSystemId,
                                                                                    PostedData.BillingMethodId,
                                                                                    PostedData.StudyLevelIds,
                                                                                    PostedData.StudyGroupIds,
                                                                                    PostedData.PolicyPeriodId,
                                                                                    PostedData.ChallanMethodId,
                                                                                    DateTime.Now,
                                                                                    Session_Manager.UserId,
                                                                                    DateTime.Now,
                                                                                    Session_Manager.UserId,
                                                                                    (int?)DocumentStatus.DocType.BRANCH_SETTING,
                                                                                    (int?)DocumentStatus.DocStatus.Active_BranchSetting,
                                                                                    true,
                                                                                    Session_Manager.BranchId,
                                                                                    Session_Manager.CompanyId,
                                                                                    ResponseParameter
                                                                                    );

                        #endregion
                        #region RESPONSE VALUES IN VARIABLE
                        int? Response = (int)ResponseParameter.Value;
                        #endregion
                        #region TRANSACTION HANDLING DETAIL
                        switch (Response)
                        {
                            case (int?)HttpResponses.CODE_SUCCESS:
                            case (int?)HttpResponses.CODE_DATA_UPDATED:

                                dbTran.Commit();
                                break;
                           
                            case (int?)HttpResponses.CODE_BAD_REQUEST:
                                dbTran.Rollback();
                                break;
                        }
                        #endregion
                        return HttpStatus.HttpResponseByReturnValue(Response);

                    }
                    catch (Exception Ex)
                    {
                        dbTran.Rollback();
                        return HttpStatus.HttpResponses.CODE_INTERNAL_SERVER_ERROR.ToInt();
                    }
                }
            }
        }
        public static int? Update_Insert_AppClass(_SqlParameters PostedData)
        {
            using (var db = new SESEntities())
            {
                using (System.Data.Entity.DbContextTransaction dbTran = db.Database.BeginTransaction())
                {
                    try
                    {
                        #region DB SETTING
                        if (PostedData.OperationType == nameof(DB_OperationType.INSERT_DATA_INTO_DB))
                        {
                            PostedData.GuID = Uttility.fn_GetHashGuid();
                        }
                        #endregion

                        #region OUTPUT VARIABLES
                        var ResponseParameter = new ObjectParameter("Response", typeof(string));
                        #endregion
                        #region STORE PROCEDURE EXECUTION AppClass_Insert
                        var data = db.AppClass_UpSert(
                                                    PostedData.OperationType,
                                                    PostedData.GuID,
                                                    PostedData.Description,
                                                    PostedData.StudyLevelId,
                                                    PostedData.StudyGroupId,
                                                    DateTime.Now,
                                                    Session_Manager.UserId,
                                                    DateTime.Now,
                                                    Session_Manager.UserId,
                                                    (int?)DocumentStatus.DocType.CLASSES,
                                                    (int?)DocumentStatus.DocStatus.Working_CLASSES,
                                                    true,
                                                    Session_Manager.BranchId,
                                                    Session_Manager.CompanyId,
                                                    ResponseParameter
                                                    );
                        #endregion
                        #region RESPONSE VALUES IN VARIABLE
                        int? Response = (int)ResponseParameter.Value;
                        #endregion
                        #region TRANSACTION HANDLING DETAIL
                        switch (Response)
                        {
                            case (int?)HttpResponses.CODE_SUCCESS:
                            case (int?)HttpResponses.CODE_DATA_UPDATED:

                                dbTran.Commit();
                                break;

                            case (int?)HttpResponses.CODE_BAD_REQUEST:
                                dbTran.Rollback();
                                break;
                        }
                        #endregion
                        return HttpStatus.HttpResponseByReturnValue(Response);
                        
                    }
                    catch (Exception ex)
                    {
                        dbTran.Rollback();
                        return HttpStatus.HttpResponses.CODE_INTERNAL_SERVER_ERROR.ToInt();
                    }
                }
            }
        }
        public static int? Update_Insert_AppSession(_SqlParameters PostedData)
        {
            using (var db = new SESEntities())
            {
                using (System.Data.Entity.DbContextTransaction dbTran = db.Database.BeginTransaction())
                {
                    try
                    {
                        int? Response = (int?)HttpResponses.CODE_DATA_ALREADY_EXIST;
                        var IsAlreadyActiveSession = office360.Common.DataBaseProcedures.Common.GetDataFromDB.CountCheck_AppSession(PostedData).ToList();
                        if (IsAlreadyActiveSession.Count == 0)
                        {

                            #region DB SETTING
                            if (PostedData.OperationType == nameof(DB_OperationType.INSERT_DATA_INTO_DB))
                            {
                                PostedData.GuID = Uttility.fn_GetHashGuid();
                            }
                            #endregion
                            #region VARIABLES
                            DateTime? EffectiveFrom = PostedData.SessionStartDate;
                            DateTime? ExpiredOn = PostedData.SessionEndDate;
                            #endregion
                            #region OUTPUT VARIABLES
                            var ResponseParameter = new ObjectParameter("Response", typeof(string));
                            #endregion
                            #region EXECUTION OF STORE PROCEDURE AppSession_Insert
                            var data = db.AppSession_UpSert(
                                                PostedData.OperationType,
                                                PostedData.GuID,
                                                PostedData.Description,
                                                PostedData.CampusId,
                                                PostedData.SessionStartDate,
                                                PostedData.SessionEndDate,
                                                PostedData.EnrollmentTypeId,
                                                PostedData.ClassIds,
                                                DateTime.Now,
                                                Session_Manager.UserId,
                                                DateTime.Now,
                                                Session_Manager.UserId,
                                                (int?)DocumentStatus.DocType.ADMISSION,
                                                (int?)DocStatus.Open_ADMISSION,
                                                true,
                                                Session_Manager.BranchId,
                                                Session_Manager.CompanyId,
                                                ResponseParameter
                                );
                            int? ParentSessionId = ResponseParameter.Value.ToInt();


                            int? SelectedCampusChallanSetting = db.GeneralBranchSetting.Where(x => x.CampusId == PostedData.CampusId.ToInt()).Select(x => x.ChallanMethodId).FirstOrDefault();
                            int? AllowedChallanNumberForSelectedCampus = db.ChallanMethod.Where(x => x.Id == SelectedCampusChallanSetting).Select(x => x.ChallanNo).FirstOrDefault();
                            int? SessionPeriodDays = (((DateTime)PostedData.SessionEndDate - (DateTime)PostedData.SessionStartDate).Days);
                            int? NumberOfDaysForSessionDetailPeriod = (AllowedChallanNumberForSelectedCampus > 0)? (SessionPeriodDays / AllowedChallanNumberForSelectedCampus): 0;

                            #endregion


                            #region RESPONSE VALUES IN VARIABLE
                            Response = (int)ResponseParameter.Value;
                            #endregion
                            #region TRANSACTION HANDLING DETAIL
                            if (Response == (int?)HttpResponses.CODE_SUCCESS)
                            {
                                dbTran.Commit();
                            }
                            #endregion
                        }

                        return HttpStatus.HttpResponseByReturnValue(Response);
                    }
                    catch (Exception ex)
                    {
                        dbTran.Rollback();
                        return HttpStatus.HttpResponses.CODE_INTERNAL_SERVER_ERROR.ToInt();
                    }
                }
            }
        }
        public static int? Update_Insert_AppStudent(_SqlParameters PostedData)
        {
            int? Response = (int?)HttpResponses.CODE_BAD_REQUEST;
            using (var db = new SESEntities())
            {
                using (System.Data.Entity.DbContextTransaction dbTran = db.Database.BeginTransaction())
                {
                    try
                    {

                        #region DB SETTING
                        if (PostedData.OperationType == nameof(DB_OperationType.INSERT_DATA_INTO_DB))
                        {
                            PostedData.GuID = Uttility.fn_GetHashGuid();
                        }
                        #endregion
                        #region OUTPUT VARAIBLE PARENT
                        var ResponseParameter = new ObjectParameter("Response", typeof(int));
                        var CodeParameter = new ObjectParameter("Code_", typeof(string));
                        var StudentIdParameter = new ObjectParameter("StudentId", typeof(int));
                        #endregion
                        //#region EXECUTE STORE PROCEDURE AppStudent_Insert
                        //db.AppStudent_Insert(
                        //                    PostedData.SessionId,
                        //                    PostedData.FirstName,
                        //                    PostedData.LastName,
                        //                    PostedData.CnicNo_FormBNo,
                        //                    PostedData.GenderId,
                        //                    PostedData.DateofBirth,
                        //                    PostedData.MartialStatusId,
                        //                    PostedData.ReligionId,
                        //                    PostedData.NationalityId,
                        //                    PostedData.ResedenitalAddress,
                        //                    PostedData.MobileNumber,
                        //                    PostedData.EmailAddress,
                        //                    PostedData.ParentName,
                        //                    PostedData.ParentNICNo,
                        //                    PostedData.ParentStudyLevelId,
                        //                    PostedData.OccupationId,
                        //                    PostedData.RelationshipId,
                        //                    PostedData.MonthlyIncome,
                        //                    (int?)DocStatus.Active_STUDENT,
                        //                    Session_Manager.UserId,
                        //                    Session_Manager.BranchId,
                        //                    Session_Manager.CompanyId,
                        //                    (int?)Models.General.DocumentStatus.DocType.STUDENT,
                        //                    CodeParameter,
                        //                    ResponseParameter,
                        //                    StudentIdParameter
                        //                    );
                        //#endregion
                        #region RESPONSE VALUES IN VARIABLE
                        string code = (string)CodeParameter.Value;
                        int? response = (int)ResponseParameter.Value;
                        int? StudentId = (int)StudentIdParameter.Value;
                        #endregion
                        #region TRANSACTION HANDLING PARENT
                        if (response != (int?)HttpResponses.CODE_SUCCESS)
                        {
                            Response = (int?)HttpResponses.CODE_INTERNAL_SERVER_ERROR;
                            dbTran.Rollback();
                        }
                        else if (response == (int?)HttpResponses.CODE_SUCCESS)
                        {
                            #region OUTPUT VARAIBLE DETAIL
                            var _ResponseParameter = new ObjectParameter("Response", typeof(int));
                            #endregion
                            #region EXECUTE STORE PROCEDURE AppClassRegistration_Insert
                            db.AppClassRegistration_Insert(
                                PostedData.SessionId,
                                StudentId,
                                PostedData.ClassId,
                                (int?)Models.General.DocumentStatus.DocStatus.NewEnrollment_CLASS_REGISTRATION,
                                (int?)Models.General.DocumentStatus.DocType.CLASS_REGISTRATION,
                                Session_Manager.UserId,
                                Session_Manager.BranchId,
                                Session_Manager.CompanyId,
                                _ResponseParameter
                                );
                            #endregion
                            #region RESPONSE VALUES IN VARIABLE
                            int? _response = (int)ResponseParameter.Value;
                            #endregion
                            #region TRANSACTION HANDLING DETAIL
                            if (_response != (int?)HttpResponses.CODE_SUCCESS)
                            {
                                Response = (int?)HttpResponses.CODE_INTERNAL_SERVER_ERROR;

                                dbTran.Rollback();
                            }
                            else if (_response == (int?)HttpResponses.CODE_SUCCESS)
                            {
                                Response= (int?)HttpResponses.CODE_SUCCESS;
                                dbTran.Commit();
                            }
                            #endregion

                        }
                       
                        #endregion
                        return HttpStatus.HttpResponseByReturnValue(Response);
                    }
                    catch (Exception ex)
                    {
                        dbTran.Rollback();
                        return HttpStatus.HttpResponses.CODE_INTERNAL_SERVER_ERROR.ToInt();
                    }
                }
            }
        }
    }
}