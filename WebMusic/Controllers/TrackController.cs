using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using WebMusic.Models;

namespace WebMusic.Controllers
{
    public class TrackController : Controller
    {

        MusicEntities db = new MusicEntities();

        // GET: Track
        public ActionResult Index(int id)
        {
            return View(id);
        }

        public PartialViewResult Detail_Track(int id)
        {

            ViewBag.Artist = db.TRACK_ARTIST.Where(p => p.ID_TRACK == id).Select(p => p.NAME_ARTIST).ToList();
            ViewBag.Label = db.TRACK_ARTIST.Where(p => p.ID_TRACK == id).Select(p => p.NAME_LABEL).ToList();

            return PartialView(db.TRACKs.Where(p => p.ID == id).SingleOrDefault());
        }

        public PartialViewResult Track_Total(int id)
        {
            List<List<string>> trackTotal = new List<List<string>>();
            List<List<List<string>>> artistList = new List<List<List<string>>>();

            string nameTrack = db.TRACKs.Where(p => p.ID == id).Select(p => p.NAME).SingleOrDefault();

            List<TRACK> track = db.TRACKs.Where(p => p.NAME == nameTrack).ToList();
            foreach (var item in track)
            {

                List<string> temp = new List<string>();
                temp.Add(item.ID.ToString());
                temp.Add(item.LINK);
                temp.Add(item.NAME);
                temp.Add(item.GENRE);
                temp.Add(item.TEMPO.ToString());
                temp.Add(item.KEY_);
                temp.Add(item.LENGTH);
                temp.Add((item.COST.ToString()));

                trackTotal.Add(temp);

                List<List<string>> temp2 = new List<List<string>>();
                temp2.Add(db.TRACK_ARTIST.Where(p => p.ID_TRACK == item.ID).Select(p => p.NAME_ARTIST).ToList());
                temp2.Add(new List<string>());
                artistList.Add(temp2);

            }


            List<REMIX> remix = db.REMIXes.Where(p => p.NAME == nameTrack).ToList();
            foreach (var item in remix)
            {
                List<string> temp = new List<string>();
                temp.Add(item.ID.ToString());
                temp.Add(item.LINK);
                temp.Add(item.NAME);
                temp.Add(item.GENRE);
                temp.Add(item.TEMPO.ToString());
                temp.Add(item.KEY_);
                temp.Add(item.LENGTH);
                temp.Add((item.COST.ToString()));

                trackTotal.Add(temp);

                List<List<string>> temp2 = new List<List<string>>();
                temp2.Add(db.TRACK_ARTIST.Where(p => p.ID_TRACK == item.ID_TRACK).Select(p => p.NAME_ARTIST).ToList());
                temp2.Add(db.REMIX_ARTIST.Where(p => p.ID_REMIX == item.ID).Select(p => p.NAME_ARTIST).ToList());
                artistList.Add(temp2);
            }

            ViewBag.TrackTotal = trackTotal;
            ViewBag.ArtistTotal = artistList;
            ViewBag.number = trackTotal.Count;

            return PartialView();
        }

        public PartialViewResult More_Track_Artist(int id)       //id la id cua track -> lay id artist tu do 
        {

            List<List<string>> listTrack = new List<List<string>>();
            List<List<List<string>>> listInfo = new List<List<List<string>>>();

            //lay id cua tat ca cac artist tham gia
            List<int> tempIdArtist = db.TRACK_ARTIST.Where(p => p.ID_TRACK == id).Select(p => p.ID_ARTIST).ToList();
            //lay id cua tat ca cac track cua cac artist do
            List<int> allIdTrackArtist = db.TRACK_ARTIST.Where(x => tempIdArtist.Contains(x.ID_ARTIST)).Select(x=>x.ID_TRACK).ToList();
            allIdTrackArtist = allIdTrackArtist.Distinct().ToList();
            allIdTrackArtist.RemoveAll(x=>x==id);

            TRACK tempTrack = new TRACK();
            foreach (var i in allIdTrackArtist)
            {
                tempTrack = db.TRACKs.SingleOrDefault(x => x.ID == i);
                listTrack.Add(new List<string>() {tempTrack.ID.ToString() , tempTrack.NAME, tempTrack.LINK_IMG , tempTrack.LINK , tempTrack.COST.ToString()});
                listInfo.Add(new List<List<string>>() { db.TRACK_ARTIST.Where(p=>p.ID_TRACK==i).Select(p=>p.NAME_ARTIST).ToList() , db.TRACK_ARTIST.Where(p => p.ID_TRACK == i).Select(p => p.NAME_LABEL).Distinct().ToList() });
            }

            ViewBag.listTrack = listTrack;
            ViewBag.listInfo = listInfo;


            return PartialView();
        }


        public PartialViewResult More_Track_Label(int id)       //id la id cua track -> lay id artist tu do 
        {

            List<List<string>> listTrack = new List<List<string>>();
            List<List<List<string>>> listInfo = new List<List<List<string>>>();

            //lay name cua tat ca cac label tham gia
            List<string> tempIdArtist = db.TRACK_ARTIST.Where(p => p.ID_TRACK == id).Select(p => p.NAME_LABEL).ToList();
            //lay id cua tat ca cac track cua cac label do
            List<int> allIdTrackLabel = db.TRACK_ARTIST.Where(x => tempIdArtist.Contains(x.NAME_LABEL)).Select(x => x.ID_TRACK).Take(40).ToList();
            allIdTrackLabel = allIdTrackLabel.Distinct().ToList();
            allIdTrackLabel.RemoveAll(x => x == id);

            TRACK tempTrack = new TRACK();
            foreach (var i in allIdTrackLabel)
            {
                tempTrack = db.TRACKs.SingleOrDefault(x => x.ID == i);
                listTrack.Add(new List<string>() { tempTrack.ID.ToString(), tempTrack.NAME, tempTrack.LINK_IMG, tempTrack.LINK, tempTrack.COST.ToString() });
                listInfo.Add(new List<List<string>>() { db.TRACK_ARTIST.Where(p => p.ID_TRACK == i).Select(p => p.NAME_ARTIST).ToList(), db.TRACK_ARTIST.Where(p => p.ID_TRACK == i).Select(p => p.NAME_LABEL).Distinct().ToList() });
            }

            ViewBag.listTrack = listTrack;
            ViewBag.listInfo = listInfo;


            return PartialView();
        }

    }
}