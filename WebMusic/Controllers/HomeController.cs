using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using WebMusic.Models;

namespace WebMusic.Controllers
{
    public class HomeController : Controller
    {

        MusicEntities db = new MusicEntities();

        public ActionResult Index()
        {
            return View();
        }

        public PartialViewResult HotSlider()
        {

            return PartialView(db.HOME_HOT_NEW.ToList());

        }

        public PartialViewResult Top_6_DJ()
        {
            return PartialView((from p in db.TOP_6_DJ select p).ToList());
        }

        public PartialViewResult New_Track()
        {

            List<NEW_TRACK> lst;
            lst = (from p in db.NEW_TRACK select p).OrderBy(p => p.RANKK).ToList();

            List<List<List<string>>> info = new List<List<List<string>>>();
            for (int i = 0; i < lst.Count; i++)
            {
                List<List<string>> tempParent = new List<List<string>>();

                int tempVar = lst[i].ID;
                
                tempParent.Add(db.TRACK_ARTIST.Where(p => p.ID_TRACK == tempVar).Select(p=>p.NAME_ARTIST).ToList());
                tempParent.Add(db.TRACK_ARTIST.Where(p => p.ID_TRACK == tempVar).Select(p => p.NAME_LABEL).ToList());
                info.Add(tempParent);
            }

            ViewBag.NewTrackInfo = info;

            return PartialView(lst);

        }

    }
}