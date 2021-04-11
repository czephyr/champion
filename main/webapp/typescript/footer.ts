let footerString: string = `
	<div class="big-row">
<div class="slogan">
	<!-- prettier-ignore -->
	<h2>Behind every Champion,</h2>
<!-- prettier-ignore -->
<h2>ahead of every start, </h2>
<!-- prettier-ignore -->
<h2>Right there when matters.</h2>
</div>
<div class="column">
<ul class="contacts">
	<li>(888) 555-5555</li>
<li>me@email.com</li>
<li>321 Magnolia St, Edwards, MS, 39066</li>
</ul>
<ul class="socials">
<li><i class="fab fa-instagram fa-4x"></i></li>
<li><i class="fab fa-facebook fa-4x"></i></li>
<li><i class="fab fa-youtube fa-4x"></i></li>
<li><i class="fab fa-twitter fa-4x"></i></li>
</ul>
</div>
</div>
<h6>&copy;2021 by <span class="bold-text">Alfredo</span>.</h6>`;

window.addEventListener("DOMContentLoaded", () => {
	document.getElementsByTagName("footer")[0].innerHTML =footerString;
});
