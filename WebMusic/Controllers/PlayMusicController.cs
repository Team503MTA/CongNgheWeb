using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebMusic.Models;

namespace WebMusic.Controllers
{
    public class PlayMusicController : Controller
    {
        MusicEntities db = new MusicEntities();

        // GET: PlayMusic
        [HttpPost]
        public ActionResult GetMusic(PostTrackRemix post)
        {
            Product prod = new Product();
            if (post.type == 1)
            {
                TRACK temp = db.TRACKs.Where(p => p.ID == post.id).SingleOrDefault();
                prod.id = post.id;
                prod.type = (byte)post.type;
                prod.name = temp.NAME;
                prod.artist = db.TRACK_ARTIST.Where(p => p.ID_TRACK == temp.ID).Select(p => p.NAME_ARTIST).ToList();
                prod.label = db.TRACK_ARTIST.Where(p => p.ID_TRACK == temp.ID).Select(p => p.NAME_LABEL).Distinct().ToList();
                prod.link = temp.LINK;
                if (prod.link[0] == '~')
                {
                    prod.link = temp.LINK.TrimStart('~');
                    prod.link = '.' + prod.link;
                }
                prod.link_Img = temp.LINK_IMG;
                if (prod.link_Img[0] == '~')
                {
                    prod.link_Img = temp.LINK_IMG.TrimStart('~');
                    prod.link_Img = '.' + prod.link_Img;
                }
                return Json(prod);
            }else
            {
                REMIX temp = db.REMIXes.Where(p => p.ID == post.id).SingleOrDefault();
                prod.id = post.id;
                prod.type = (byte)post.type;
                prod.name = temp.NAME;
                prod.artist = db.REMIX_ARTIST.Where(p => p.ID_REMIX == temp.ID).Select(p => p.NAME_ARTIST).ToList();
                prod.label = db.REMIX_ARTIST.Where(p => p.ID_REMIX == temp.ID).Select(p => p.NAME_LABEL).Distinct().ToList();
                prod.link = temp.LINK;
                prod.link_Img = "@Url.Content(" + temp.LINK_IMG + ")";

                return Json(prod);
            }
        }
    }
}