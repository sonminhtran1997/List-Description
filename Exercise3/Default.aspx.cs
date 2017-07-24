using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Exercise3;
using System.Web.Script.Serialization;
using System.Text;

namespace Exercise3
{
    public partial class Default : System.Web.UI.Page
    {
        public static List<Student> list = new List<Student>();
        public static String status = null;

        public void edit()
        {
            String id = GetValue("ID");
            Student editingStudent = list.Find(x => x.id == id);
            editingStudent.firstName = GetValue("FirstName");
            editingStudent.lastName = GetValue("LastName");
            editingStudent.description = GetValue("Description");        
        }
        public void add()
        {
            String id = GetValue("ID");
            if (list.Find(x => x.id == id) == null)
            {
                String firstName = GetValue("FirstName");
                String lastName = GetValue("LastName");
                String description = GetValue("Description");
                Student addingStudent = new Student(firstName, lastName, id, description);
                list.Add(addingStudent);
                status = "SUCCESSFUL";
                return;
            }
            status = "Duplicated student, cannot add";
        }
        /// <summary>
        /// delete the student from the backend list
        /// </summary>
        /// <param name="Id">the id of the student to be deleted</param>
        public void delete()
        {
            String id = GetValue("ID");
            var deleteItem = list.Single(r => r.id == id);
            list.Remove(deleteItem);
        }
        /// <summary>
        /// get the value of the specified collection key
        /// </summary>
        /// <param name="key">The key in which value is needed</param>
        /// <returns></returns>
        private string GetValue(string key)
        {
            string result = "";
            result = Convert.ToString(Request.Params[key]);
            return result;
        }

        protected void Page_Load(object sender, EventArgs e)
        {
            string type = GetValue("TypeFunc");
            switch (type)
            {
                case "add":
                    add();
                    break;
                case "edit":
                    edit();
                    break;
                case "delete":
                    delete();
                    break;
                default:
                    break;
            }
            if (status == "SUCCESSFUL")
            {
                JavaScriptSerializer js = new JavaScriptSerializer();
                String json = js.Serialize(list) /*+ js.Serialize(status)*/;
                Response.Write(json);
            }
            else
            {
                Response.Write(status);
            }
        }

        
    }
}