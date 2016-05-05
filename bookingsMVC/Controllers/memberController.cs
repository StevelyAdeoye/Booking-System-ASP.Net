using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using bookingsMVC.Models;

namespace bookingsMVC.Controllers
{
    public class memberController : Controller
    {
        private BookingEntities db = new BookingEntities();

        //
        // GET: /member/

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Letter()
        {
            return View();
        }
        public JsonResult bystring(string id, int qcode)
        {
            string searchString = id;
            int mycode = qcode;


            var mymessages = from b in db.member
                             select b;

            if (qcode == 1)
            {
                mymessages = mymessages.Where(b => b.lname.StartsWith(searchString));
            }
            if (qcode == 2)
            {
                mymessages = mymessages.Where(b => b.memcat.Equals(searchString));
            }
            if (qcode == 3)
            {
                mymessages = mymessages.Where(b => b.town.Equals(searchString));
            }

            return Json(mymessages, JsonRequestBehavior.AllowGet);
        }
        //
        // GET: /member/Details/5

        public ActionResult Details(int id = 0)
        {
            member member = db.member.Find(id);
            if (member == null)
            {
                return HttpNotFound();
            }
            return View(member);
        }

        public JsonResult logUserIn( String username, String password)
        {


            var mymessages = from b in db.member
                             select b;

            mymessages = mymessages.Where(b => b.username.Equals(username) && b.password.Equals(password));
            return Json(mymessages, JsonRequestBehavior.AllowGet);
        }

        //
        // GET: /member/Create

        public ActionResult Create()
        {
            return View();
        }

        //
        // POST: /member/Create

        [HttpPost]
        public ActionResult Create(member member)
        {
            if (ModelState.IsValid)
            {
                db.member.Add(member);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(member);
        }

        //
        // GET: /member/Edit/5

        public ActionResult Edit(int id = 0)
        {
            member member = db.member.Find(id);
            if (member == null)
            {
                return HttpNotFound();
            }
            return View(member);
        }

        //
        // POST: /member/Edit

        [HttpPost]

        public void Edit(member member)
        {
            if (ModelState.IsValid)
            {
                db.Entry(member).State = EntityState.Modified;
                db.SaveChanges();
            }

        }


        //
        // GET: /member/Delete/5

        public ActionResult Delete(int id = 0)
        {
            member member = db.member.Find(id);
            if (member == null)
            {
                return HttpNotFound();
            }
            return View(member);
        }

        //
        // POST: /member/Delete/5

        [HttpPost, ActionName("Delete")]
        public ActionResult DeleteConfirmed(int id)
        {
            member member = db.member.Find(id);
            db.member.Remove(member);
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}