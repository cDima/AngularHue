﻿using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;

namespace AngularHue.Models
{
    public class DBContext : IdentityDbContext<User>
    {
        public DBContext()
            : base("applicationDB")
        {

        }
        //Override default table names
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }

        public static DBContext Create()
        {
            return new DBContext();
        }

        public DbSet<todoItem> todos { get; set; }

        public DbSet<HueConfig> configs { get; set; }
    }

    
    public class todoItem
    {
        [Key]
        public int id { get; set; }
        public string task { get; set; }
        public bool completed { get; set; }
    }

    public class HueConfig
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public string FromIP { get; set; }
        public string Config { get; set; }
        public DateTime AddedOn { get; set; }
    }

    //This function will ensure the database is created and seeded with any default data.
    public class DBInitializer : CreateDatabaseIfNotExists<DBContext>
    {
        protected override void Seed(DBContext context)
        {
            //Create an seed data you wish in the database.
        }
    }
}

