﻿//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace WebMusic.Models
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class MusicEntities : DbContext
    {
        public MusicEntities()
            : base("name=MusicEntities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<ARTIST> ARTISTs { get; set; }
        public virtual DbSet<FORMULA_HOT> FORMULA_HOT { get; set; }
        public virtual DbSet<GENRE> GENREs { get; set; }
        public virtual DbSet<GENRE_ARTIST> GENRE_ARTIST { get; set; }
        public virtual DbSet<GENRE_LABEL> GENRE_LABEL { get; set; }
        public virtual DbSet<HISTORY_USER> HISTORY_USER { get; set; }
        public virtual DbSet<HOME_HOT_NEW> HOME_HOT_NEW { get; set; }
        public virtual DbSet<Home_NewTrack> Home_NewTrack { get; set; }
        public virtual DbSet<LABEL> LABELs { get; set; }
        public virtual DbSet<NEW_TRACK> NEW_TRACK { get; set; }
        public virtual DbSet<REMIX> REMIXes { get; set; }
        public virtual DbSet<REMIX_ARTIST> REMIX_ARTIST { get; set; }
        public virtual DbSet<SALE> SALEs { get; set; }
        public virtual DbSet<SHOW> SHOWs { get; set; }
        public virtual DbSet<STATISTIC_ARTIST> STATISTIC_ARTIST { get; set; }
        public virtual DbSet<STATISTIC_REMIX> STATISTIC_REMIX { get; set; }
        public virtual DbSet<STATISTIC_TRACK> STATISTIC_TRACK { get; set; }
        public virtual DbSet<sysdiagram> sysdiagrams { get; set; }
        public virtual DbSet<TOP_6_DJ> TOP_6_DJ { get; set; }
        public virtual DbSet<TRACK> TRACKs { get; set; }
        public virtual DbSet<TRACK_ARTIST> TRACK_ARTIST { get; set; }
        public virtual DbSet<USER> USERs { get; set; }
        public virtual DbSet<VIDEO> VIDEOs { get; set; }
    }
}
