using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
        public class BuggyController : BaseApiController

    {
        [HttpGet("not-found")]
        public ActionResult GetNotFound()
        {
            return NotFound();
        }

         [HttpGet("bad-request")]
        public ActionResult GetBadRequest()
        {
            return BadRequest(new ProblemDetails{Title = "This is a bad Request"});
        }
         [HttpGet("unathorised")]
        public ActionResult GetUnauthorised()
        {
            return Unauthorized();
        }
         [HttpGet("validation-error")]
        public ActionResult GetValidationError()
        {
            ModelState.AddModelError("Problem 1","This is the First Error");
            ModelState.AddModelError("Problem 2", "This is the Second Error");
            return ValidationProblem();
        }
        [HttpGet("server-error")]
        public ActionResult GetServerError()
        {
           throw new Exception("This is a server error");

        }
        
    }
}