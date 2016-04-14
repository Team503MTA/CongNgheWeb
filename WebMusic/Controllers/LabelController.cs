using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebMusic.Models;

namespace WebMusic.Controllers
{
    public class LabelController : Controller
    {
        MusicEntities db = new MusicEntities();

        // GET: Label
        public ActionResult Index(string name)
        {
            return View(db.LABELs.Where(p => p.NAME == name).Select(p => p.ID).FirstOrDefault());
        }

        public PartialViewResult Detail(Int16 id)
        {

            LABEL lb = db.LABELs.FirstOrDefault(p => p.ID == id);

            ViewBag.InfoLabel = db.GENRE_LABEL.Where(p => p.ID_LABEL == id).OrderByDescending(p => p.POINT).Select(p => p.NAME_GENRE).Take(3).ToList();

            return PartialView(lb);
        }

        public PartialViewResult Artist_Label(Int16 id)
        {

            return PartialView(
                db.ARTISTs.Where(p => p.ID_LABEL == id)
                    .OrderByDescending(p => p.POINT_ALL)
                    .Select(p => new List<string>() { p.ID.ToString(), p.NAME, p.IMG, p.FB, p.TW })
                    .ToList()
            );
        }
    }
}