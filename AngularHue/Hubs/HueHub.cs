using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;
using AngularHue.Models;
using System.Data;
using System.Collections.Concurrent;
using System.Threading.Tasks;
using AngularHue.Auth;

namespace AngularHue.Hubs
{
    [HubName("HueHub")]
    public class HueHub : Hub
    {
        private static ConcurrentDictionary<string, List<int>> _mapping = new ConcurrentDictionary<string, List<int>>();
        //private HueContext db = new HueContext();

        public override Task OnConnected()
        {
            _mapping.TryAdd(Context.ConnectionId, new List<int>());
            Clients.All.newConnection(_mapping.Count);
            return base.OnConnected();
        }

        public override Task OnDisconnected(bool stopCalled)
        {
            var list = new List<int>();
            _mapping.TryRemove(Context.ConnectionId, out list);
            Clients.All.removeConnection(_mapping.Count);
            return base.OnDisconnected(stopCalled);
        }
    }
}