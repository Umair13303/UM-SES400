using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
namespace office360.Models.General
{
    public class BULK_TTModel
    {
        public DataTable AppSessionDetail_BULK_TT()
        {
            // Create a DataTable instance
            DataTable AppSessionDetail_BULK = new DataTable();

            AppSessionDetail_BULK.Columns.Add("Id", typeof(Guid));               
            AppSessionDetail_BULK.Columns.Add("GuID", typeof(Guid));               
            AppSessionDetail_BULK.Columns.Add("AppSessionId", typeof(int));      
            AppSessionDetail_BULK.Columns.Add("Description", typeof(string));       
            AppSessionDetail_BULK.Columns.Add("PeriodStartOn", typeof(DateTime));   
            AppSessionDetail_BULK.Columns.Add("PeriodEndOn", typeof(DateTime));     
            AppSessionDetail_BULK.Columns.Add("Status", typeof(bool));              

            return AppSessionDetail_BULK;
        }

    }
}