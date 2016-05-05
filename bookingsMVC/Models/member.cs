using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace bookingsMVC.Models
{
    public class member
    {
        public int ID { get; set; }
        public string username { get; set; }
        public string fname { get; set; }
        public string lname { get; set; }
        public string address1 { get; set; }
        public string address2 { get; set; }
        public string town { get; set; }
        public string postcode { get; set; }
        public string phone { get; set; }
        public string email { get; set; }     
        public string password { get; set; }
        public string memcat { get; set; }
    }
}

