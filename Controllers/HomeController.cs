using Microsoft.AspNetCore.Mvc;

namespace imitator.controllers{
    public class HomeController : Controller{
        public IActionResult Index(){
            return View();
        }
    }
}