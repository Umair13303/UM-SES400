using office360.Common.CommonHelper;
using office360.Extensions;
using office360.Models.EDMX;
using office360.Models.General;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using static office360.Models.General.DocumentStatus;
using static office360.Models.General.HttpStatus;
using static office360.Models.General.DBListCondition;


namespace office360.Common.DataBaseProcedures.AAccounts
{
    public class GetDataFromSP
    {
        SESEntities db = new SESEntities();
     
        
        #region HELPER FOR :: DROP DOWN LIST
        public static List<StructureFeeType_GetListByParam_Result> GET_MT_STRUCTUREFEETYPE_BYPARAM(_SqlParameters PostedData)
        {
            List<StructureFeeType_GetListByParam_Result> DATA = new List<StructureFeeType_GetListByParam_Result>();
            using (var db = new SESEntities())
            {
                DATA = db.StructureFeeType_GetListByParam(
                                                            PostedData.DB_IF_PARAM,
                                                            Session_Manager.CompanyId,
                                                            Session_Manager.BranchId
                                                          ).ToList();
            }
                return DATA;
        }
        public static List<StructureCOAAccount_GetListByParam_Result> GET_MT_STRUCTURECOAACCOUNT_BYPARAM(_SqlParameters PostedData)
        {
            List<StructureCOAAccount_GetListByParam_Result> DATA = new List<StructureCOAAccount_GetListByParam_Result>();
            using (var db = new SESEntities())
            {
                DATA = db.StructureCOAAccount_GetListByParam(
                                                 Session_Manager.CompanyId,
                                                 Session_Manager.BranchId,
                                                 PostedData.DB_IF_PARAM,
                                                 PostedData.CoaCatagoryIds
                                                 ).ToList();
                return DATA;
            }
        }
        public static List<AccFeeStructure_GetListByParam_Result> GET_MT_ACCFEESTRUCTURE_BYPARAM(_SqlParameters PostedData)
        {
            List<AccFeeStructure_GetListByParam_Result> DATA = new List<AccFeeStructure_GetListByParam_Result>();
            using (var db = new SESEntities())
            {
                DATA = db.AccFeeStructure_GetListByParam(
                                                            PostedData.DB_IF_PARAM,
                                                            Session_Manager.CompanyId,
                                                            PostedData.CampusId,
                                                            PostedData.SessionId,
                                                            PostedData.ClassId
                                                          ).ToList();
            }
            return DATA;
        }
        public static List<AccFeeStructureDetail_GetListByParam_Result> GET_MT_ACCFEESTRUCTUREDETAIL_BYPARAM(_SqlParameters PostedData)
        {
            List<AccFeeStructureDetail_GetListByParam_Result> DATA = new List<AccFeeStructureDetail_GetListByParam_Result>();
            using (var db = new SESEntities())
            {
                DATA = db.AccFeeStructureDetail_GetListByParam(
                                                            PostedData.DB_IF_PARAM,
                                                            Session_Manager.CompanyId,
                                                            PostedData.CampusId,
                                                            PostedData.FeeStructureId,
                                                            PostedData.SessionId,
                                                            PostedData.ClassId
                                                          ).ToList();
            }
            return DATA;
        }
        public static List<StructureDiscountType_GetListByParam_Result> GET_MT_STRUCTUREDISCOUNTTYPE_BYPARAM(_SqlParameters PostedData)
        {
            List<StructureDiscountType_GetListByParam_Result> DATA = new List<StructureDiscountType_GetListByParam_Result>();
            using (var db = new SESEntities())
            {
                DATA = db.StructureDiscountType_GetListByParam(
                                                            PostedData.DB_IF_PARAM,
                                                            Session_Manager.BranchId,
                                                            Session_Manager.CompanyId,
                                                            PostedData.Id
                                                          ).ToList();
            }
            return DATA;
        }
        #endregion

        #region HELPER FOR :: DATA TABLE LIST
        public static List<StructureFeeType_GetListBySearch_Result> GET_MT_STRUCTUREFEETYPE_LISTSEARCHPARAM(_SqlParameters PostedData)
        {
            List<StructureFeeType_GetListBySearch_Result> List = new List<StructureFeeType_GetListBySearch_Result>();
            using (var db = new SESEntities())
            {
                List = db.StructureFeeType_GetListBySearch(
                                                                    Session_Manager.CompanyId,
                                                                    Session_Manager.BranchId,
                                                                    PostedData.SearchById,
                                                                    PostedData.InputText
                                                                    ).ToList<StructureFeeType_GetListBySearch_Result>();
            }
            return List;

        }
        public static List<AccFeeStructure_GetListBySearch_Result> GET_MT_ACCFEESTRUCTURE_LISTSEARCHPARAM(_SqlParameters PostedData)
        {
            List<AccFeeStructure_GetListBySearch_Result> List = new List<AccFeeStructure_GetListBySearch_Result>();
            using (var db = new SESEntities())
            {
                List = db.AccFeeStructure_GetListBySearch(
                                                                    Session_Manager.CompanyId,
                                                                    Session_Manager.BranchId,
                                                                    PostedData.SearchById,
                                                                    PostedData.InputText
                                                                    ).ToList<AccFeeStructure_GetListBySearch_Result>();
            }
            return List;

        }
        #endregion

        #region HELPER FOR :: GET DETAIL FOR ID
        public static List<_SqlParameters> GET_MT_STRUCTUREFEETYPE_INFO_BY_GUID(_SqlParameters PostedData)
        {
            List<_SqlParameters> List = new List<_SqlParameters>();
            using (var db = new SESEntities())
            {
                List = 
                       ((List<_SqlParameters>)
                       (from SFT in db.StructureFeeType
                            where
                                SFT.CompanyId == Session_Manager.CompanyId && SFT.BranchId == Session_Manager.BranchId && SFT.GuID==PostedData.GuID
                                select new _SqlParameters
                                {
                                    Id = SFT.Id,
                                    GuID = SFT.GuID,
                                    FeeName = SFT.Description,
                                    FeeCatagory = db.FeeCatagory.Where(FC => FC.Id == SFT.FeeCatagoryId).Select(FC => FC.Description).FirstOrDefault(),
                                    ChargingMethod = db.ChargingMethod.Where(CM => CM.Id == SFT.ChargingMethodId).Select(CM => CM.Description).FirstOrDefault(),
                                    FeeCatagoryId = SFT.FeeCatagoryId,
                                    ChargingMethodId = SFT.ChargingMethodId,
                                    IsOnAdmission = SFT.IsOnAdmission,
                                    IsDiscount = SFT.IsDiscount,
                                    IsRefundable = SFT.IsRefundable,
                                    IsSecurity = SFT.IsSecurity,
                                    AssetAccountId = SFT.AssetAccountId,
                                    RevenueAccountId = SFT.RevenueAccountId,
                                    LiabilityAccountId = SFT.LiabilityAccountId,
                                    CostOfSaleAccountId = SFT.CostOfSaleAccountId,
                                }).ToList());
            }
            return List;
        }
        public static List<_SqlParameters> GET_MT_ACCFEESTRUCTURE_INFO_BY_GUID(_SqlParameters PostedData)
        {
            List<_SqlParameters> List = new List<_SqlParameters>();
            using (var db = new SESEntities())
            {
                List = 
                       ((List<_SqlParameters>)
                       (from AFS in db.AccFeeStructure
                            where
                                AFS.CompanyId == Session_Manager.CompanyId && AFS.BranchId == PostedData.CampusId && AFS.GuID == PostedData.GuID
                        select new _SqlParameters
                        {
                            Id = AFS.Id,
                            GuID = AFS.GuID,
                            Code = AFS.Code,
                            Description = AFS.Description,
                            SessionId = AFS.SessionId,
                            ClassId = AFS.ClassId,
                            WHTaxPolicyId = AFS.WHTaxPolicyId,
                            TotalFeeExclusive = AFS.TotalFeeExclusive,
                            WHTAmount = AFS.WHTAmount,
                            TotalFee = AFS.TotalFee,
                            CampusId = AFS.CampusId,
                        }).ToList());
            }
            return List;
        }
        public static List<_SqlParameters> GET_MT_ACCFEESTRUCTUREDETAIL_INFO_BY_ID(_SqlParameters PostedData)
        {
            List<_SqlParameters> List = new List<_SqlParameters>();
            using (var db = new SESEntities())
            {
                List = 
                       ((List<_SqlParameters>)
                       (from AFS in db.AccFeeStructureDetail
                            where
                               AFS.FeeStructureId==PostedData.Id && AFS.Status == true
                        select new _SqlParameters
                        {
                            Id = AFS.Id,
                            GuID = AFS.GuID,
                            FeeAmount = AFS.Amount,
                            FeeName = db.StructureFeeType.Where(SFT => SFT.Id == AFS.FeeTypeId).Select(SFT => SFT.Description).FirstOrDefault(),
                            RevenueAccount = db.StructureCOAAccount.Where(COA => COA.Id == AFS.RevenueAccountId).Select(COA => COA.ShortDescription + " [" + COA.Code + " ]").FirstOrDefault(),
                            AssetAccount = db.StructureCOAAccount.Where(COA => COA.Id == AFS.AssetAccountId).Select(COA => COA.ShortDescription + " [" + COA.Code + " ]").FirstOrDefault(),
                            LiabilityAccount = db.StructureCOAAccount.Where(COA => COA.Id == AFS.LiabilityAccountId).Select(COA => COA.ShortDescription + " [" + COA.Code + " ]").FirstOrDefault(),
                            CostOfSaleAccount = db.StructureCOAAccount.Where(COA => COA.Id == AFS.CostOfSaleAccountId).Select(COA => COA.ShortDescription + " [" + COA.Code + " ]").FirstOrDefault(),
                            FeeTypeId = AFS.FeeTypeId,
                            RevenueAccountId = AFS.RevenueAccountId,
                            AssetAccountId = AFS.AssetAccountId,
                            LiabilityAccountId = AFS.LiabilityAccountId,
                            CostOfSaleAccountId = AFS.CostOfSaleAccountId,
                     
                        }).ToList());
            }
            return List;
        }
        public static List<_SqlParameters> GET_MT_STRUCTUREDISCOUNTTYPE_INFO_BY_GUID(_SqlParameters PostedData)
        {
            List<_SqlParameters> List = new List<_SqlParameters>();
            using (var db = new SESEntities())
            {
                List =
                       ((List<_SqlParameters>)
                       (from SFT in db.StructureDiscountType
                        where
                            SFT.CompanyId == Session_Manager.CompanyId && SFT.BranchId == Session_Manager.BranchId && SFT.GuID == PostedData.GuID
                        select new _SqlParameters
                        {
                            Id = SFT.Id,
                            GuID = SFT.GuID,
                            Code = SFT.Code,
                            Description = SFT.Description,
                            Remarks = SFT.Remarks,
                            
                        }).ToList());
            }
            return List;
        }
        #endregion

        #region HELPER FOR :: DUPLICATE RECORD CHECK
        public static List<_SqlParameters> ISEXIST_FEESTRUCTURE_FOR_CLASS(_SqlParameters PostedData)
        {
            using (var db = new SESEntities())
            {
                var DATA = db.AccFeeStructure.Where(x =>

                                                 x.Status == true
                                                && x.DocumentStatus==(int ?)DocStatus.Active_FEE_STRUCTURE
                                                && x.SessionId == PostedData.SessionId
                                                && x.ClassId == PostedData.ClassId
                                                
                                                && x.CompanyId == Session_Manager.CompanyId).Select(x => new _SqlParameters { Id = x.Id }).ToList();

                return DATA;
            }
        }

        #endregion
    }
}