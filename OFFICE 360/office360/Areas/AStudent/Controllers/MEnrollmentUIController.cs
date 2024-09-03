using office360.Common.CommonHelper;
using office360.Common.DataBaseProcedures;
using office360.CommonHelper;
using office360.Extensions;
using office360.Models.EDMX;
using office360.Models.General;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using static office360.Models.General.DocumentStatus;
using static office360.Models.General.HttpStatus;
using static office360.Models.General.DBListCondition;

namespace office360.Areas.AStudent.Controllers
{
    public class MEnrollmentUIController : Controller
    {
        SESEntities db = new SESEntities();
        int? StatusCode = 0;
        int? _Exe = 0;
        #region RENDER VIEW
        [UsersSessionCheck]
        [CompanySessionCheck]
        public ActionResult CreateNewEnrollment(_SqlParameters PostedData)
        {
            #region PASS VIEW
            _Exe = GetAllListFromDB.GetAllowedUsersRightsByParameter(PostedData.RightId);
            #endregion
            if (_Exe == (int?)HttpResponses.CODE_SUCCESS)
            {
                ViewBag.Title = PostedData.DisplayName.ToSafeString();
                ViewBag.DB_OperationType = PostedData.OperationType.ToSafeString();

                ViewBag.SessionDetail = Common.DataBaseProcedures.Common.GetDataFromDB.GET_ACTIVE_AppSession_DETAIL(PostedData);
                return View();
            }
            else
            {
                return RedirectToAction(_ActionsURL.LogIn, _Controller.Home, new { area = "" });
            }

        }
        #endregion
        public ActionResult GET_MT_GENERALBRANCH_BYPARAMETER(_SqlParameters PostedData)
        {
            var DATA = Common.DataBaseProcedures.ACompany.GetDataFromSP.GET_MT_GENERALBRANCH_BYPARAM(PostedData).ToList();
            return Json(DATA, JsonRequestBehavior.AllowGet);
        }
        public ActionResult GET_MT_APPSESSION_BYPARAMETER(_SqlParameters PostedData)
        {
            var DATA = Common.DataBaseProcedures.ACompany.GetDataFromSP.GET_MT_APPSESSION_BYPARAM(PostedData).ToList();
            return Json(DATA, JsonRequestBehavior.AllowGet);
        }
        public ActionResult GET_MT_APPSESSIONDETAIL_BYPARAMETER(_SqlParameters PostedData)
        {
            var DATA = Common.DataBaseProcedures.ACompany.GetDataFromSP.GET_MT_APPSESSIONDETAIL_BYPARAM(PostedData).ToList();
            return Json(DATA, JsonRequestBehavior.AllowGet);
        }
        public ActionResult GET_MT_APPCLASS_BYPARAMETER(_SqlParameters PostedData)
        {
            var DATA = Common.DataBaseProcedures.ACompany.GetDataFromSP.GET_MT_APPCLASS_BYPARAM(PostedData).ToList();
            return Json(DATA, JsonRequestBehavior.AllowGet);
        }
        public ActionResult GET_LK1_RELIGION(_SqlParameters PostedData)
        {
            var DATA = Common.DataBaseProcedures.Common.GetDataFromDB.GET_LK1_Religion(PostedData).ToList();
            return Json(DATA, JsonRequestBehavior.AllowGet);
        }
        public ActionResult GET_LK1_COUNTRY(_SqlParameters PostedData)
        {
            var DATA = Common.DataBaseProcedures.Common.GetDataFromDB.GET_LK1_Country(PostedData).ToList();
            return Json(DATA, JsonRequestBehavior.AllowGet);
        }
        public ActionResult GET_LK1_OCCUPATION(_SqlParameters PostedData)
        {
            var DATA = Common.DataBaseProcedures.Common.GetDataFromDB.GET_LK1_Occupation(PostedData).ToList();
            return Json(DATA, JsonRequestBehavior.AllowGet);
        }
        public ActionResult GET_LK1_ADMISSIONCATAGORY(_SqlParameters PostedData)
        {
            var DATA = Common.DataBaseProcedures.Common.GetDataFromDB.GET_LK1_AdmissionCatagory(PostedData).ToList();
            return Json(DATA, JsonRequestBehavior.AllowGet);
        }
        public ActionResult GET_MT_ACCFEESTRUCTURE_BYPARAMETER(_SqlParameters PostedData)
        {
            var DATA = Common.DataBaseProcedures.AAccounts.GetDataFromSP.GET_MT_ACCFEESTRUCTURE_BYPARAM(PostedData).ToList();
            return Json(DATA, JsonRequestBehavior.AllowGet);
        }
        public ActionResult GET_MT_ACCFEESTRUCTUREDETAIL_BYPARAMETER(_SqlParameters PostedData)
        {
            var DATA = Common.DataBaseProcedures.AAccounts.GetDataFromSP.GET_MT_ACCFEESTRUCTUREDETAIL_BYPARAM(PostedData).ToList();
            return Json(DATA, JsonRequestBehavior.AllowGet);
        }

        public ActionResult GET_DATA_BY_PARAMETER(_SqlParameters PostedData)
        {
            List<_SqlParameters> DATA = null;

            //switch (PostedData.ActionCondition)
            //{
            //    case nameof(SESActionCondition.GET_MT_GENERALBRANCH_BYPARAMETER):
            //        DATA = Common.DataBaseProcedures.ACompany.GetDataFromSP.GET_MT_GENERALBRANCH_BYPARAM(PostedData).ToList();
            //        break;
            //    case nameof(SESActionCondition.GET_MT_APPSESSION_BYPARAMETER):
            //        DATA = Common.DataBaseProcedures.ACompany.GetDataFromSP.GET_MT_APPSESSION_BYPARAM(PostedData).ToList();
            //        break;
            //    case nameof(SESActionCondition.GET_MT_APPSESSIONDETAIL_BYPARAMETER):
            //        DATA = Common.DataBaseProcedures.ACompany.GetDataFromSP.GET_MT_APPSESSIONDETAIL_BYPARAM(PostedData).ToList();
            //        break;
            //    case nameof(SESActionCondition.GET_MT_APPCLASS_BYPARAMETER):
            //        DATA = Common.DataBaseProcedures.ACompany.GetDataFromSP.GET_MT_APPCLASS_BYPARAM(PostedData).ToList();
            //        break;
            //    case nameof(LookUpActionCondition.GET_LK1_RELIGION):
            //        DATA = Common.DataBaseProcedures.Common.GetDataFromDB.GET_LK1_Religion(PostedData).ToList();
            //        break;
            //    case nameof(LookUpActionCondition.GET_LK1_COUNTRY):
            //        DATA = Common.DataBaseProcedures.Common.GetDataFromDB.GET_LK1_Country(PostedData).ToList();
            //        break;
            //    case nameof(LookUpActionCondition.GET_LK1_OCCUPATION):
            //        DATA = Common.DataBaseProcedures.Common.GetDataFromDB.GET_LK1_Occupation(PostedData).ToList();
            //        break;
            //    case nameof(LookUpActionCondition.GET_LK1_ADMISSIONCATAGORY):
            //        DATA = Common.DataBaseProcedures.Common.GetDataFromDB.GET_LK1_AdmissionCatagory(PostedData).ToList();
            //        break;

            //}
            return Json(DATA, JsonRequestBehavior.AllowGet);
        }
        #region CHECK DUPLICATE
        public ActionResult CHECK_FEESTRUCTURE_FOR_CLASS(_SqlParameters PostedData)
        {
            var DATA = Common.DataBaseProcedures.AAccounts.GetDataFromSP.ISEXIST_FEESTRUCTURE_FOR_CLASS(PostedData);
            return Json(DATA, JsonRequestBehavior.AllowGet);
        }

        #endregion

        #region INSERT DATA INTO DATABASE 
        public ActionResult Insert_AppStudent(_SqlParameters PostedData)
        {
            _Exe = Common.DataBaseProcedures.ACompany.InsertIntoDB.Update_Insert_AppStudent(PostedData);
            var data = new { Message = HttpStatus.HTTPTransactionMessagByStatusCode(_Exe), StatusCode = StatusCode };
            return Json(data, JsonRequestBehavior.AllowGet);
        }
        #endregion  
    }
}