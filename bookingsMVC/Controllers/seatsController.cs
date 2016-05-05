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
    public class seatsController : Controller
    {
        private BookingEntities db = new BookingEntities();

        //
        // GET: /seats/

        public ActionResult Index()
        {
            return View(db.seats.ToList());
        }

        public JsonResult getseats()
        {


            var mymessages = from b in db.seats
                             select b;
            
            mymessages = mymessages.Where(b => b.status.Equals(0));
            return Json(mymessages, JsonRequestBehavior.AllowGet);
        }

        public JsonResult checkout(String tickets)
        {
            var mymessages = from b in db.seats
                             select b;
            if (ModelState.IsValid)
            {
                string[] vare = tickets.Split(' ');
                foreach (var d in vare)
                {
                    var result = mymessages.Where(b => b.seatnum.Equals(d));
                    
                 foreach ( var p in result)
                 {
                     p.status = 0;
                     System.Diagnostics.Debug.WriteLine(d);
                 }

                }

             db.SaveChanges();
             seats se = new seats();
             se.status = 1;


            }
            return Json(mymessages, JsonRequestBehavior.AllowGet);

           
        }

        public JsonResult cancelBookings(String tickets)
        {
            var mymessages = from b in db.seats
                             select b;
            if (ModelState.IsValid)
            {
                string[] vare = tickets.Split(' ');
                foreach (var d in vare)
                {
                    var result = mymessages.Where(b => b.seatnum.Equals(d));
                    foreach (var p in result)
                    {
                        p.status = 0;
                        System.Diagnostics.Debug.WriteLine(p.seatnum);
                    }

                }

                db.SaveChanges();
                seats se = new seats();
                se.status = 1;


            }
            return Json(mymessages, JsonRequestBehavior.AllowGet);


        }

        //
        // GET: /seats/Details/5

        public ActionResult Details(int id = 0)
        {
            seats seats = db.seats.Find(id);
            if (seats == null)
            {
                return HttpNotFound();
            }
            return View(seats);
        }

        //
        // GET: /seats/Create

        public ActionResult Create()
        {
            return View();
        }

        //
        // POST: /seats/Create

        [HttpPost]
        public ActionResult Create(seats seats)
        {
            if (ModelState.IsValid)
            {
                db.seats.Add(seats);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(seats);
        }
        //
        // POST: /seats/Update

        [HttpPost]
        // GET: /seats/Edit/5

        public ActionResult Edit(int id = 0)
        {
            seats seats = db.seats.Find(id);
            if (seats == null)
            {
                return HttpNotFound();
            }
            return View(seats);
        }

        //
        // POST: /seats/Edit/5

        [HttpPost]
        public ActionResult Edit(seats seats)
        {
            if (ModelState.IsValid)
            {
                db.Entry(seats).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(seats);
        }

        //
        // GET: /seats/Delete/5

        public ActionResult Delete(int id = 0)
        {
            seats seats = db.seats.Find(id);
            if (seats == null)
            {
                return HttpNotFound();
            }
            return View(seats);
        }

        //
        // POST: /seats/Delete/5

        [HttpPost, ActionName("Delete")]
        public ActionResult DeleteConfirmed(int id)
        {
            seats seats = db.seats.Find(id);
            db.seats.Remove(seats);
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