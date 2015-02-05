namespace AngularHue.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class HueConfigs : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.HueConfigs",
                c => new
                    {
                        id = c.Int(nullable: false, identity: true),
                        FromIP = c.String(),
                        BridgeIP = c.String(),
                        Config = c.String(),
                        Added = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.HueConfigs");
        }
    }
}
