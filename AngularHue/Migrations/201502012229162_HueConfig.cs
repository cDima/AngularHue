namespace AngularHue.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class HueConfig : DbMigration
    {
        public override void Up()
        {
            DropTable("dbo.HueConfigs");
            CreateTable(
                "dbo.HueConfigs",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        FromIP = c.String(),
                        Config = c.String(),
                        AddedOn = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.HueConfigs");
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
    }
}
