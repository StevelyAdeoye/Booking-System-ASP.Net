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
    public class AdminController : Controller
    {
        private BookingEntities db = new BookingEntities();

        //
        // GET: /Admin/

        public ActionResult Index()
        {
            return View(db.member.ToList());
        }

        public ActionResult Letter()
        { return View("Letter"); }


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
        // GET: /Admin/Details/5

        public ActionResult Details(int id = 0)
        {
            member member = db.member.Find(id);
            if (member == null)
            {
                return HttpNotFound();
            }
            return View(member);
        }

        //
        // GET: /Admin/Create

        public ActionResult Create()
        {
            return View();
        }

        //
        // POST: /Admin/Create

        [HttpPost]
        [ValidateAntiForgeryToken]
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
        // GET: /Admin/Edit/5

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
        // POST: /Admin/Edit/5

        [HttpPost]
        // [ValidateAntiForgeryToken]
        public ActionResult Edit(member member)
        {
            if (ModelState.IsValid)
            {
                db.Entry(member).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Letter");
            }
            return View(member);
        }

        //
        // GET: /Admin/Delete/5

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
        // POST: /Admin/Delete/5

        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
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