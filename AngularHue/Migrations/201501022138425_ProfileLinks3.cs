namespace AngularHue.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class ProfileLinks3 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.AspNetUsers", "ProfileLinkGoogle", c => c.String());
            AddColumn("dbo.AspNetUsers", "ProfileLinkFacebook", c => c.String());
            DropColumn("dbo.AspNetUsers", "ProfileLink");
        }
        
        public override void Down()
        {
            AddColumn("dbo.AspNetUsers", "ProfileLink", c => c.String());
            DropColumn("dbo.AspNetUsers", "ProfileLinkFacebook");
            DropColumn("dbo.AspNetUsers", "ProfileLinkGoogle");
        }
    }
}
