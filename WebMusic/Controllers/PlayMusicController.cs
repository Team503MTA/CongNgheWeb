using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
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
        public JsonResult GetMusic(int id , int type)
        {
            StringBuilder sb = new StringBuilder();
            if (type == 1)
            {
                TRACK track = db.TRACKs.FirstOrDefault(p => p.ID == id);
                var artist = db.TRACK_ARTIST.Where(p => p.ID_TRACK == id).Select(p => p.NAME_ARTIST).ToList();

                sb.Append("<div class='tag-playmusic' id='all-tagMusicBottom'>");
                sb.Append("<div class='playmusic-info' id='all-playmusic-change'>");
                sb.Append("<div class='imgPlayMusic'>");
                sb.Append("<img src = '." + track.LINK_IMG + "' />");
                sb.Append("</div >");
                sb.Append("<div class='textPlayMusic'>");
                sb.Append("<a href='#' class='playmusic-name'>" + track.NAME + "</a>");
                for (int i = 0; i < artist.Count; i++)
                {
                    sb.Append("<a href='#' class='playmusic-artist'>" + artist[i] + "</a>");
                    if (i != artist.Count - 1)
                    {
                        sb.Append("<span> ft </span>");
                    }
                }

                sb.Append("</div>");
                sb.Append("</div>");
                sb.Append("<div class='playmusic-time'>");
                sb.Append("<label id ='playmusic-start'></label>");
                sb.Append("<progress id='playmusic-process' value='0' max='100'></progress>");
                sb.Append("<label id='playmusic-end'></ label >");
                sb.Append("</div>");
                sb.Append("<div class='playmusic-button'>");
                sb.Append("<button id='playmusic-prev'>");
                sb.Append("<i class='glyphicon glyphicon-backward'></i>");
                sb.Append("</button>");
                sb.Append("<button id='playButton'>");
                sb.Append("<i class='glyphicon glyphicon-play'></i>");
                sb.Append("<i class='glyphicon glyphicon-pause'></i>");
                sb.Append("</button>");
                sb.Append("<button id='playmusic-next'>");
                sb.Append("<i class='glyphicon glyphicon-forward'></i>");
                sb.Append("</button>");
                sb.Append("<button id='loopButton'>");
                sb.Append("<i class='glyphicon glyphicon-repeat'></i>");
                sb.Append("</button>");
                sb.Append("<div id='volume'>");
                sb.Append("<button id='volumeButton'>");
                sb.Append("<i class='glyphicon glyphicon-volume-down'></i>");
                sb.Append("<i class='glyphicon glyphicon-volume-up'></i>");
                sb.Append("<i class='glyphicon glyphicon-volume-off'></i>");
                sb.Append("</button>");
                sb.Append("<progress id='volumeProBar' value='100' max='100'></progress>");
                sb.Append("</div>");
                sb.Append("</div>");
                sb.Append("<audio id='myTune' controls onloadedmetadata='audioLoad()' >");
                sb.Append("<source src='." + track.LINK + "'>");
                sb.Append("</audio>");
                sb.Append("</div>");
            }
            else
            {
                REMIX track = db.REMIXes.FirstOrDefault(p => p.ID ==id);
                var artist = db.REMIX_ARTIST.Where(p => p.ID_REMIX == id).Select(p => p.NAME_ARTIST).ToList();

                sb.Append("<div class='tag-playmusic' id='all-tagMusicBottom'>");
                sb.Append("<div class='playmusic-info' id='all-playmusic-change'>");
                sb.Append("<div class='imgPlayMusic'>");
                sb.Append("<img src = '." + track.LINK_IMG + "' />");
                sb.Append("</div >");
                sb.Append("<div class='textPlayMusic'>");
                sb.Append("<a href='#' class='playmusic-name'>" + track.NAME + "</a>");
                for (int i = 0; i < artist.Count; i++)
                {
                    sb.Append("<a href='#' class='playmusic-artist'>" + artist[i] + "</a>");
                    if (i != artist.Count - 1)
                    {
                        sb.Append("<span> ft </span>");
                    }
                }
                sb.Append("</div>");
                sb.Append("</div>");
                sb.Append("<div class='playmusic-time'>");
                sb.Append("<label id ='playmusic-start'></label>");
                sb.Append("<progress id='playmusic-process' value='0' max='100'></progress>");
                sb.Append("<label id='playmusic-end'></ label >");
                sb.Append("</div>");
                sb.Append("<div class='playmusic-button'>");
                sb.Append("<button id='playmusic-prev'>");
                sb.Append("<i class='glyphicon glyphicon-backward'></i>");
                sb.Append("</button>");
                sb.Append("<button id='playButton'>");
                sb.Append("<i class='glyphicon glyphicon-play'></i>");
                sb.Append("<i class='glyphicon glyphicon-pause'></i>");
                sb.Append("</button>");
                sb.Append("<button id='playmusic-next'>");
                sb.Append("<i class='glyphicon glyphicon-forward'></i>");
                sb.Append("</button>");
                sb.Append("<button id='loopButton'>");
                sb.Append("<i class='glyphicon glyphicon-repeat'></i>");
                sb.Append("</button>");
                sb.Append("<div id='volume'>");
                sb.Append("<button id='volumeButton'>");
                sb.Append("<i class='glyphicon glyphicon-volume-down'></i>");
                sb.Append("<i class='glyphicon glyphicon-volume-up'></i>");
                sb.Append("<i class='glyphicon glyphicon-volume-off'></i>");
                sb.Append("</button>");
                sb.Append("<progress id='volumeProBar' value='100' max='100'></progress>");
                sb.Append("</div>");
                sb.Append("</div>");
                sb.Append("<audio id='myTune' controls onloadedmetadata='audioLoad()' >");
                sb.Append("<source src='." + track.LINK + "'>");
                sb.Append("</audio>");
                sb.Append("</div>");
            }

            return Json(sb.ToString());
        }
    }
}