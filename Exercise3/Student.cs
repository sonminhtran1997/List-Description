using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace Exercise3
{
    public class Student 
    {
        public String id { get; set; }
        public String firstName { get; set; }
        public String lastName { get; set; }
        public String description { get; set; }
        public Student() { }
        public Student(String firstName, String lastName, String id, String description)
        {
            this.firstName = firstName;
            this.lastName = lastName;
            this.description = description;
            this.id = id;
        }

        

        public override string ToString()
        {
            return this.firstName + " " + this.lastName + " " + this.id + " " + description + "\n"; 
        }
        
    }
    
}
