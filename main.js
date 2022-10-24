temp = []
function emi(id) { if (document.getElementById(id)) { return document.getElementById(id) } }
function print(...msg) {
	var em = emi("log")
	msg.forEach(function(message) {
		if (em) {
			em.innerHTML = em.innerHTML + '['+time()+'] '+message
			em.appendChild(document.createElement('br'))
		}
		console.log('['+time()+'] '+message)
	})
}
function log(msg, lvl) {
	var em = emi("log")
	var levels = ['userdata', 'info', 'warning', 'error', 'crash']
	if (em) {
		em.innerHTML = em.innerHTML + '['+time()+'] <@'+levels[lvl || 0]+'> '+msg
		em.appendChild(document.createElement('br'))
	}
	console.log('['+time()+'] <@'+levels[lvl || 0]+'> '+msg)
}

function percent(this_num, of_the) { return Math.round( (100 * this_num) / of_the ) }
function time() {
	var get_time = new Date()
	var hour = get_time.getHours()
	var min = get_time.getMinutes()
	var sec = get_time.getSeconds()
	if (hour.toString().length==1) {hour = '0'+hour}
	if (min.toString().length==1) {min = '0'+min}
	if (sec.toString().length==1) {sec = '0'+sec}
	return hour+":"+min+':'+sec
}
function fullscreen() {
	var em = document.body
	if ( !em.fs || em.fs === 'false' ) {
		if (em.requestFullscreen) { em.requestFullscreen() }
		else if (em.webkitRequestFullscreen) { em.webkitRequestFullscreen() }
		else if (em.msRequestFullscreen) { em.msRequestFullscreen() }
		em.fs = 'true'
	}
	else if ( em.fs === 'true' ) {
		if (document.exitFullscreen) { document.exitFullscreen() }
		else if (document.webkitExitFullscreen) { document.webkitExitFullscreen() }
		else if (document.msExitFullscreen) { document.msExitFullscreen() }
		em.fs = 'false'
	}
}

// Set/change a global CSS variable
function pattern(CSSVar, val) { document.documentElement.style.setProperty('--'+CSSVar, val) }
// Scroll to an element
function scroll2(id) { emi(id).scrollIntoView() }
// Set functions for device type
function vport(func_desktop, func_mobile) {
	let h = window.innerHeight
	let w = window.innerWidth
	if ( percent(h, w) > 100 ) { func_mobile() }
	else { func_desktop() }
}

// Require a script into HTML
function require(source) {
	var script = document.createElement('script')
	script.src = source
	document.documentElement.appendChild(script)
}
// Load JS script / CSS sheet from a string
function loadstring(str) {
	var script = document.createElement('script')
	script.innerHTML = str
	document.documentElement.appendChild(script)
}
function loadsheet(str) {
	var style = document.createElement('style')
	style.innerHTML = str
	document.documentElement.appendChild(style)
}

// Copy text from an element to clipboard
function clip(id) {
	if ( emi(id) ) {
		navigator.clipboard.writeText(emi(id).textContent)
	} else { log('clip :: Element with id ['+id+'] does not exist', 1) }
}
// Insert text into an element
function type(id, txt) {
	if ( emi(id) ) {
		emi(id).appendChild(document.createTextNode(txt))
		emi(id).appendChild(document.createElement('br'))
	} else { log('type :: Element with id ['+id+'] does not exist', 1) }
}
// Erase text data of an element
function erase(id) {
	if ( emi(id) ) {
		emi(id).textContent = ''
	} else { log('erase :: Element with id ['+id+'] does not exist', 1) }
}

// Erase all internal data of an element
function wipe(id) {
	if ( emi(id) ) {
		emi(id).innerHTML = ''
	} else { log('wipe :: Element with id ['+id+'] does not exist', 1) }
}
// Remove one or multiple elements
function rm(...ids) {
	ids.forEach(function(id) {
		if ( emi(id) ) {
			emi(id).remove()
		} else { log('rm :: Element with id ['+id+'] does not exist', 1) }
	})
}
// Make one or multiple elements/write data within a specific root body
function mk(root_id, html_or_array) {
	root = emi(root_id)
	if ( root ) {
		if ( typeof html_or_array === 'object' ) {
			for (var index in html_or_array) {
				root.innerHTML = root.innerHTML + html_or_array[index]
			}
		} else { root.innerHTML = root.innerHTML + html_or_array }
	} else { log('mk :: Root element with id ['+root_id+'] does not exist', 1) }
}

// Animate an element, optionally add a second animation and set an interval
function a8(id, animation, a8opt, int_opt) {
	var a8em = emi(id)
	if ( a8em ) {
		if ( !a8opt && !int_opt ) { a8em.style.animation = animation }
		else {
			setInterval( function() { a8em.style.animation = animation }, int_opt )
			setInterval( function() { a8em.style.animation = a8opt }, int_opt*2 )
		}
	} else { log('a8 :: Element with id ['+id+'] does not exist', 1) }
}
// Add a switch-state expression to an element and assign 2 animations to it
function a8ss(id, a8A, a8B) {
	var a8em = emi(id)
	if ( a8em ) {
		if ( !a8em.value || a8em.value === 'false' ) {
			a8em.style.animation = a8A
			a8em.value = 'true'
		}
		else if ( a8em.value === 'true' ) {
			a8em.style.animation = a8B
			a8em.value = 'false'
		}
	} else { log('a8 :: Element with id ['+id+'] does not exist', 1) }
}
// Animate multiple objects on interval
// <str: name> Name for a loop; <int: interval> Execution interval (ms);
// <array: table> Array with element IDs; <str: a8x2> CSS Animations
function a8x(name, interval, table, a8show, a8hide) {
	if (!temp[name+'_i']) { temp[name+'_i'] = -1 } // Set [i] for loop
	if (!temp[name+'Switch']) { temp[name+'Switch'] = true } // Set a switch
	setInterval( function() {
		if ( temp[name+'Switch'] ) {
			if ( temp[name+'_i'] < table.length-1 ) {
				temp[name+'_i']++
				a8(table[ temp[name+'_i'] ], a8hide)
			} else {
				temp[name+'_i'] = table.length
				temp[name+'Switch'] = false
			} // {a, b, c} ex :: (0.hide[init]) -> 1.hide -> 2.hide -> false
		}
		if ( !temp[name+'Switch'] ) {
			if ( temp[name+'_i'] > 0 ) {
				temp[name+'_i']--
				a8(table[ temp[name+'_i'] ], a8show)
			} else {
				temp[name+'_i'] = 0
				temp[name+'Switch'] = true
				a8(table[ temp[name+'_i'] ], a8hide)
			} // {a, b, c} ex :: 2.show -> 1.show -> 0.show -> true -> 0.hide
		}
	}, interval) // P.S: Not gonna debug it, it's already huge and complicated
}

// Add a switch-state expression to an element and assign 2 functions to it
function trig(id, funcON, funcOFF) {
	em = emi(id)
	if (em) {
		if ( !em.state || em.state === 'OFF' ) {
			funcON()
			em.state = 'ON'
		}
		else if ( em.state === 'ON' ) {
			funcOFF()
			em.state = 'OFF'
		}
	}
	else { log('trig :: Element with id ['+id+'] does not exist', 1) }
}

// Scroll back to top on call
function scroll_top(id) {
	if (id) { emi(id).scrollTop = 0 }
	else { document.body.scrollIntoView() }
}
function scroll_bottom(id) {
	if (id) { emi(id).scrollTop = emi(id).scrollHeight }
	else { window.scrollTo(0, document.body.scrollHeight) }
}
// Trigger a function/animation when an element is visible at a certain depth in px
function render(id, depth, func, func_false) {
	if (document.body.scrollTop > (window.innerHeight*depth) || document.documentElement.scrollTop > (window.innerHeight*depth)) {
		if (func instanceof Function) { func() }
		else { emi(id).style.opacity = 1 }
	}
	else {
		if (func_false instanceof Function) { func_false() }
		else { emi(id).style.opacity = 0 }
	}
}

// Draggable elements; _set arg is optional, set it to 1 if you want to keep updated position
draggable = []
function drag(id, _set) {
	if (!emi(id).dragF) {
		emi(id).dragF = true; draggable.push(id)
		document.onmouseup = function(){ emi(id).dragF = false }
	}
	if (_set) { emi(id).dragSet = 1 }
}

// . . .
function twemojiParse() { twemoji.parse(document.documentElement, {folder: 'svg', ext: '.svg'}) }

function dispSwitch(id) {
	em = emi(id)
	if (id == 'htmlData') {
		em.style.display = 'block'
		emi('cssData').style.display = 'none'
		emi('jsData').style.display = 'none'
	}
	else if (id == 'cssData') {
		em.style.display = 'block'
		emi('htmlData').style.display = 'none'
		emi('jsData').style.display = 'none'
	}
	else if (id == 'jsData') {
		em.style.display = 'block'
		emi('cssData').style.display = 'none'
		emi('htmlData').style.display = 'none'
	}
	else if (id == '@vm') {
		em.style.display = 'block'
		emi('log').style.display = 'none'
	}
	else if (id == 'log') {
		em.style.display = 'block'
		emi('@vm').style.display = 'none'
	}
}

// Initial function, same as 'element.onload()'
function init() {
	document.body.requestFullscreen()
	vport(
		function(){ //desktop
			pattern('blockWidth', '47%')
			if (emi('consoleInput') && emi('consoleOutput')) {
				emi('consoleInput').style.order = 1
				emi('consoleOutput').style.order = 2
			}
		},
		function(){ // mobile
			pattern('blockWidth', '97%')
			if (emi('consoleInput') && emi('consoleOutput')) {
				emi('consoleInput').style.order = 2
				emi('consoleOutput').style.order = 1
			}
		}
	)
	
}

msg_data = {
	1: [
		`This is a basic structure of any HTML file. Let's dig into it!`, ``,
		`1. <!DOCTYPE html> <html></html> - HTML document declarations`, ``,
		`2. <head> - Metadata container you'd also like to put embedded content in which`, ``,
		`3. lang="en" dir="ltr" - Those parameters in <html> tag, and <meta charset="utf-8"> helps your browser to render things properly`, ``,
		`4. <meta name="viewport" content="width=device-width, initial-scale=1.0"> - Sets page scale to initial (100%)`, ``,
		`5. <title id="title">any_text</title> - Browser tab title for this page`, ``,
		`6. <link rel="stylesheet" href="style.css"> - Embedded stylesheet from the current directory`, ``,
		`7. <script src="main.js"></script> - Embedded script from the current directory`, ``,
		`8. <body> - Element necessary for proper page rendering. It's recommended to put your created elements in there.`,
	],
}
raw_data = {
0: [
	`This is a very brief and simplistic guide that will navigate you
	through the very basics of vanilla frontend development.`, ``,
	`It will not teach you how to make your own Twitter here and now,
	this is something that can be achieved through time and experience.`, ``,
	`For something far more detailed - the following website is #1 recommended:`,
	`https://www.w3schools.com`, ``,
	`Well, as we covered the general purpose of this guide - let's dig into it!`, ``,
	`I'll leave here a cool template that goes through some of the basic tricks,
	so if you haven't taken a grasp of the whole guide or prefer to learn everything from
	a template - feel free to click on that button below and open the vm console.`
],

1: [ // Intro
`Hello! Let's first learn the interactions for this guide!`, ``,
`1. Every box of this type can be hovered over.`,
	`When you click on it - you insert a copy of its contents in the clipboard.`,
	`Copied text is formatted in comparison to displayed version.`, ``,
`2. Most of the information, along with examples, will be displayed in the hoverable-over boxes.`, ``,
`3. Buttons on the bottom-left side of the screen are self-explanatory. Click on them to check out.`, ``,
`4. Bottom-right buttons: scroll to top, scroll to bottom, fullscreen.`, ``,
`5. Bottom-middle button opens a live execution console. You can paste and run the code you copied in there.`
],
2: [ // Syntax
`<!-- `,
`Now let's open the console and insert this text in the [index.html] tab!`, ``, ` -->`, `

<!DOCTYPE html> <html lang="en" dir="ltr">
	<head id='core'> <meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title id="title">Page Title</title>
		<link rel="stylesheet" href="style.css">
	</head>
	
	<body>
		<script src="main.js"></script>
		. . .
	</body>
	
</html>`
],
3: [ // Bodies
`Items below are all you need for most of your needs. Let's take them to the console!`, ``, `<br><br>
<!-- A comment, it only exists in the code and is used for better readability -->

<div>Block element, may contain any other elements</div>

<p>Paragraph element, acts like [div] but wrapped around text</p>

<span>Is used for stylizing parts of the text</span>
<br>
Though, instead of a span element you could use a non-existing one like <x>this</x>
<br>
<br>A line break
<br><br>
<hr>A drawn line
<br><br>
<a>Anchor element, used with 'href' parameter to navigate to an url</a>

<ul>Unordered list, <li>with</li> <li>items</li> </ul>

<ol>Ordered list, <li>with</li> <li>items</li> </ol>

<table>Table element,
	<tr>
		<th>a1</th>
		<th>a2</th>
	</tr>
	<tr>
		<th>b1</th>
		<th>b2</th>
	</tr>
</table>
<br>
Style element, contains CSS data<style>
	table, th, td {
		border: 1px solid #fff;
	}
</style>
<br><br>
Script element, contains JS data<script>
	console.log('hi')
</script>
<br><br>
<form>Form element syntax:
	<input type="text" name="name" placeholder='Name' required> <br>
	<input type="checkbox" name="cbox" required>Checkbox <br>
	<textarea placeholder='Text'></textarea> <br>
	<input type="submit" value="Test">
</form>
<br>
<img src=''>Image element, but since it's draggable - a
better idea is to use a div with 'background-image' parameter
<br><br>
Audio element<audio controls>
	<source src="" type="audio/mpeg">
</audio>
<br><br>
Video element<video width="100" height="100" controls>
	<source src="" type="video/mp4">
</video>
`,
],
4: [ // Params
`<!-- `,
`Basic global parameters for any element:`, ``,
`id - unique id, only one can exist at the same time`, ``,
`class - same as id but not unique, shares its styles between all of the elements assigned to it`, ``,
`style - CSS style`, ``,
`value - element's value, mostly used for inputs`, ``,
`textContent - element's plain text content`, ``,
`innerHTML - same as textContent but also includes child elements`, ``,
`onclick - JS function on click`, ``,
`onmouseover - JS function on element focus`, ``,
`onmouseout - JS function on element unfocus`, ``,
`onmousedown - JS function on mouse button hold`, ``,
`onmouseup - JS function on mouse button release`, ``,
`You can also use custom parameters for JS integrations.`, ``,
`Now let's test it all with the example below!`, ``, ` -->`, `

<div id='sample' class='testClass'
	style='margin: 5vmin; width: 20vmin; height: 20vmin'
	onmouseover="emi('sample').textContent = 'Hello there!'"
	onmouseout="emi('sample').innerHTML = ''"
	onclick="emi('sample').innerHTML = '<textarea></textarea>'"
></div>

<style>
	.testClass { background: #fff; color: #000 }
</style>
`
],

5: [ // Intro
`<!-- `,
`Well, time has come to switch to an easier but more flexible language - CSS!`,
`Though, first of all, let's create a template body in [index.html]: `, ``, ` -->`, `

<div class='center' id='xBody'>
	<p>Welcome Text<br>CSSにようこそ！～</p>
</div>
`,
],
6: [ // Syntax
`/*`,
`We will work around [style.css] tab in the console this time (and further on in this section)!`,
`Insert this block in the tab and take a look at its syntax.`, ``, `*/`, `

@import url('https://fonts.googleapis.com/css2?family=Hachi+Maru+Pop&display=swap');

:root {
	--xFont: 3vmin 'Hachi Maru Pop';
	--xAccent: #d7a;
}

#xBody {
	margin: 5vmin; padding: 2vmin;
	font: var(--xFont); color: #fff;
	background: var(--xAccent);
	border-radius: 5vmin;
	transition: 0.25s linear;
}
#xBody:hover {
	background: #fff; color: #000;
	animation: wobble 2s linear infinite
}

@keyframes wobble {
	0%, 50%, 100% { transform: rotate(0deg) scale(1) }
	15% { transform: rotate(3deg) scale(0.95) }
	30% { transform: rotate(-3deg) scale(0.95) }
	65% { transform: rotate(3deg) scale(1.05) }
	85% { transform: rotate(-3deg) scale(1.05) }
}
`
],
7: [ // Bodies
`There's just a few bodies in CSS, since it mostly consists of parameters rather than functions.`,
`Considering 'test' an existing body, let's take a look at them below!`, ``,
`#test {} - HTML element id`, ``,
`.test {} - HTML class`, ``,
`::test {} - Browser-side element`, ``,
`#test:hover {} - Element onhover transition`, ``,
`@keyframes test {} - An animation`, ``,
`:root {} - A storage of variables`, ``,
`html {} - HTML document`, ``,
`body {} - Document body element`, ``,
`@import url() - Embedded entity`, ``,
`/* A comment */`, ``,
],
8: [ // Params
`Since there's a lot of different parameters - we'll skip the uncommon ones and go through the regulars.`,
`Let's insert it somewhere for better readability!`, ``, `

Considering 'Em' a shortcut for 'Element':

. . .
u (or left/top/right/bottom/x/y/z) = Measure unit:
	px - Pixels
	cm - Centimeters
	mm - Millimeters
	in - Inches
	% - Root Em size percents
	vw - Viewport width
	vh - Viewport height
	vmin - Viewport min
	vmax - Viewport max
	em - Em font size
	rem - Root Em font size

. . .
Properties:

display - Em display behavior
display: block/inline/flex/grid/none

position - Em position
position: static/relative/absolute/fixed/sticky

float - Em attachment relative to its root
float: left/right

width height - Em size
width: u

top, left, bottom, right - Em position
top: u

margin - Space around Em
margin: top right bottom left/auto

padding - Filling around Em
padding: top right bottom left

border / outline - Em border/outline
border: width style color
(border-radius - Em corner rounding)

box-shadow / text-shadow - Shadow around Em/text
box-shadow: left top blurRadius color inset

background - Em filling
background: color image position/size repeat
 (note: position/size must be together, ex: 
 50% 0%/contain , where 50%=left, 0%=top)

font - System/embedded font
font: weight size name
+
color: color
letter-spacing: u
line-height: u
text-align: left/right/center/justify
text-decoration: line color style thickness/none

opacity - Em opacity
opacity: decimal

visibility - Em visibility, isn't equal to "display: none"
visibility: hidden_or_visible

overflow - Em content overflow
overflow: visible/hidden/clip/scroll

filter / backdrop-filter - Em graphic filter, possible values:
blur(u)
brightness(%)
contrast(%)
drop-shadow(h-shadow v-shadow blur spread color)
grayscale(%)
hue-rotate(deg)
invert(%)
opacity(%)
saturate(%)
sepia(%)
url()

transform - Em transformation, possible values:
translate(x,y)
translate3d(x,y,z)
scale(x,y)
scale3d(x,y,z)
rotate(angle)
rotate3d(x,y,z,angle)
perspective(n)
skew(x-angle,y-angle)
matrix(n,n, n,n, n,n)
matrix3d(
	n,n, n,n,
	n,n, n,n,
	n,n, n,n,
	n,n, n,n
)

transform-origin - Em transformation start/end point
transform-origin: x y z

transition - Em transition
transition: property duration flow delay
ex: transform: background 1s ease-out 0.5s

animation - Em animation
animation: name duration flow delay mode
ex: animation: test 2s linear 1s forwards

. . .
Properties for "display: flex":

justify-content: center/flex-start/flex-end/space-between/space-around/space-evenly
flex-wrap: nowrap/wrap/wrap-reverse

... And its children:

flex: grow shrink basis
order: number

`,
],

9: [ // Intro
`Okay, great. We went through descriptive languages, so let's proceed to an actual programming language now!`, ``,
`Since I don't know if you have any programming knowledge or not - I'll describe everything in a rather simplistic-casual way.`,
],
10: [ // Syntax
`//`,
`Let's move to [main.js] tab in the console!`,
`Insert this block and take a brief look at its syntax.`, ``, `

msg_data = {
	2: ['a', 'b', 'c'],
	3: ['abc'],
}

function post() {
	for (let x in msg_data) {
		for (let i=0; i < msg_data[x].length; i++) {
			type('msg'+x, msg_data[x][i])
		}
	}
	print('execution complete')
}

`
],
11: [ // Operators
`Operators/Statements are used for any compositions. Review them in the console for better readability.`, ``, `

1. Operators
	Subject operators
		; Semicolon, used to separate variables when a line break is not present
		= Used to assign something to a variable
		// A comment
		{} A block: a = { } / function() { }
		() Statement separator / function header: if (a < (b*2)) / function(args)
		, Comma, a variable / argument separator: a, b = 1 / (a, b) / {a: 1, b: 2}
	
	Statement operators
		if () { }
		for () { }
		while () { }
		else - used separately or with any other statement operators
		break - used to stop the execution of a loop when it reaches the target point
	
	Mathematical operators
		+ Addition, can be used to concatenate strings, just like this: 'a'+'b' (= 'ab')
		- Subtraction
		* Multiplication
		** Exponentiation (equivalent to Math.pow())
		/ Division
		% Modulus (Division Remainder)
		++ Increment (raise a number by 1 per loop tick)
		-- Decrement (decrease a number by 1 per loop tick)
		
		( Mathematical operators can be used together
		with '=' to modify the current number, ex:
		a = 10;  a += 5  // a is now 15 )
	
	Comparison operators
		== Equal to
		=== Equal value and equal type
		!= Not equal
		!== Not equal value or not equal type
		> Greater than
		< Less than
		>= Greater than or equal to
		<= Less than or equal to
		? Ternary operator
	
	Logical operators
		&& logical and
		|| logical or
		! logical not
	
	Bitwise operators
		& AND
		| OR
		~ NOT
		^ XOR
		<< Left shift
		>> Right shift
		>>> Unsigned right shift
	
	Type operators
		typeof
		instanceof
	Values of type operators
		string
		number
		boolean
		object
		function
		Object
		Date
		Array
		String
		Number
		Boolean
		null
		undefined
	
2. Values
	undefined
	null  //also called 'nil', an empty value
	string = 'str' / "str"
	`+'multistring = `str`'+`
	number = 123 / 0.015 / 0x20
	boolean = true / false
	
3. Entities
	a (unassigned variable, will return 'null')
	a = 'This is a global variable'
	const a = 'This is a global unchangeable variable'
	var a = 'This is a local (per file/script) variable'
	let a = 'This is a local {per block} variable'
	array = ['a', 'b', 1, 2]
	object = { text: 'a b', number: 12, array: [], object: {} }  //called 'table' in Lua
	function() { }  // Contains any variables and statements inside of it and can be envoked anytime
`
],
12: [ // Globals
`Functions and objects listed below are native to JS.`,
`For HTML API ones analyze [main.js] section of the MiniBatch in the very beginning of this page.`, ``, `

Set, Map - let's ignore them, instead we'll use an object:
	obj = {
		a: [1, 2, 3],
		b: 'text',
		c: {
			1: 'a',
			2: 'b'
		}
	}
	obj.d = 123  //add
	obj.a = null  //remove

Date
	new Date()
	
	_D = new Date()
	_y = _D.getFullYear()
	_M = _D.getMonth()
	_d = _D.getDate()
	_h = _D.getHours()
	_m = _D.getMinutes()
	_s = _D.getSeconds()
	print(_D, _y, _M, _d, _h, _m, _s)

Math
	Math.E - returns Euler's number
	Math.PI - returns PI
	Math.SQRT2 - returns the square root of 2
	Math.SQRT1_2 - returns the square root of 1/2
	Math.LN2 - returns the natural logarithm of 2
	Math.LN10 - returns the natural logarithm of 10
	Math.LOG2E - returns base 2 logarithm of E
	Math.LOG10E - returns base 10 logarithm of E
	
	abs(x) - Returns the absolute value of x
	acos(x) - Returns the arccosine of x, in radians
	acosh(x) - Returns the hyperbolic arccosine of x
	asin(x) - Returns the arcsine of x, in radians
	asinh(x) - Returns the hyperbolic arcsine of x
	atan(x) - Returns the arctangent of x as a numeric value between -PI/2 and PI/2 radians
	atan2(y, x) - Returns the arctangent of the quotient of its arguments
	atanh(x) - Returns the hyperbolic arctangent of x
	cbrt(x) - Returns the cubic root of x
	ceil(x) - Returns x, rounded upwards to the nearest integer
	cos(x) - Returns the cosine of x (x is in radians)
	cosh(x) - Returns the hyperbolic cosine of x
	exp(x) - Returns the value of Ex
	floor(x) - Returns x, rounded downwards to the nearest integer
	log(x) - Returns the natural logarithm (base E) of x
	max(x, y, z, ..., n) - Returns the number with the highest value
	min(x, y, z, ..., n) - Returns the number with the lowest value
	pow(x, y) - Returns the value of x to the power of y
	random() - Returns a random number between 0 and 1
	round(x) - Rounds x to the nearest integer
	sign(x) - Returns if x is negative, null or positive (-1, 0, 1)
	sin(x) - Returns the sine of x (x is in radians)
	sinh(x) - Returns the hyperbolic sine of x
	sqrt(x) - Returns the square root of x
	tan(x) - Returns the tangent of an angle
	tanh(x) - Returns the hyperbolic tangent of a number
	trunc(x) - Returns the integer part of a number (x)
`
],
13: [ // Templates
`//`,
`Time for exercises! Below are native JS templates (except for print() function).`,
`Insert them in the console, run and navigate to [log] tab to view the results!`, ``, `

// If statement
	a_val = 1
	if (a_val == 1) {
		print('check A')
	}
	else if (a_val > 1) {
		print('check B')
	}
	else { print('check C') }

// Basic loop
	for (let i=0; i < 3; i++) { print(i) }  //from 0 to 2
	for (let i=1; i <= 3; i++) { print(i) }  //from 1 to 3
	
// Array loop
	var list = ['a', 'b', 'c']
	list.forEach(function(item) { print(item) })

// Switch
	switch(1) {
		case 1:
			print('case_b')
			break;
		case 2:
			print('case_c')
			break;
		default:
			print('case_a')
	}

`
],

}
function post() {
	for (let x in msg_data) {
		for (let i=0; i < msg_data[x].length; i++) {
			type('msg'+x, msg_data[x][i])
		}
	}
	for (let x in raw_data) {
		for (let i=0; i < raw_data[x].length; i++) {
			type('raw'+x, raw_data[x][i])
		}
	}
	print('@vm :: Deployment successful')
}

function MiniBatch() {
let _html =
`<div id='vm' class='center' style='position: relative; width: 100%; min-height: 100%; z-index: 1'>
	<div class='new' id='a1'>On-hover<br>Animation</div>
	<div class='new' id='a2' onmousedown="drag('a2')" style='transition: 0s'>Draggable<br>Body</div>
	<div class='new' id='a3' onclick="wipe('a3'); mk('a3', time())">Text<br>Change</div>
	<div id='a4' class='new' style='z-index: 2'>
		On-hover<br>Menu
		<div id='a4_1'></div>
	</div>
	<div class='new' onclick="mk('vm', newDynamicBody)">Dynamic<br>Bodies</div>
</div>
`
let _css =
`@import url('https://fonts.googleapis.com/css2?family=Hachi+Maru+Pop&display=swap');
:root {
	--fontNew: 4vmin 'Hachi Maru Pop';
	--accentNew: #d7a;
}
.center { display: flex; flex-wrap: wrap; justify-content: center }
.new {
	width: 40%; height: 10vmin;
	margin: 3vmin; color: #fff;
	background: var(--accentNew);
	font: var(--fontNew);
	line-height: 4vmin;
	text-align: center;
	border-radius: 5vmin;
	transition: 0.25s linear;
}
.new:hover { background: #fff; color: #000 }

#a1:hover { animation: wobble 2s linear infinite }
#a4_1 {
	width: 100%; height: 0;
	margin-top: 2vmin;
	background: #fff;
	border-radius: 5vmin;
	transition: 0.25s linear
}
#a4:hover { border-radius: 3vmin 3vmin 0 0 }
#a4:hover #a4_1 { height: 20vmin; border-radius: 0 0 3vmin 3vmin }

@keyframes wobble {
	0%, 50%, 100% { transform: rotate(0deg) scale(1) }
	15% { transform: rotate(3deg) scale(0.95) }
	30% { transform: rotate(-3deg) scale(0.95) }
	65% { transform: rotate(3deg) scale(1.05) }
	85% { transform: rotate(-3deg) scale(1.05) }
}
`
let _js =
`// Let's airdrop new custom functions here on the top
newDynamicBody = "<div class='new' id='a0' onclick='rm(`+'`a0`'+`)'>Removable<br>Body</div>"
// ... and that's where they ends

function emi(id) { if (document.getElementById(id)) { return document.getElementById(id) } }

function print(...msg) {
	var em = emi("log")
	msg.forEach(function(message) {
		if (em) {
			em.innerHTML = em.innerHTML + '['+time()+'] '+message
			em.appendChild(document.createElement('br'))
		}
		console.log('['+time()+'] '+message)
	})
}

function log(msg, lvl) {
	var em = emi("log")
	var levels = ['userdata', 'info', 'warning', 'error', 'crash']
	if (em) {
		em.innerHTML = em.innerHTML + '['+time()+'] <@'+levels[lvl || 0]+'> '+msg
		em.appendChild(document.createElement('br'))
	}
	console.log('['+time()+'] <@'+levels[lvl || 0]+'> '+msg)
}

function time() {
	var get_time = new Date()
	var hour = get_time.getHours()
	var min = get_time.getMinutes()
	var sec = get_time.getSeconds()
	if (hour.toString().length==1) {hour = '0'+hour}
	if (min.toString().length==1) {min = '0'+min}
	if (sec.toString().length==1) {sec = '0'+sec}
	return hour+":"+min+':'+sec
}

// Set/change a global CSS variable
function pattern(CSSVar, val) { document.documentElement.style.setProperty('--'+CSSVar, val) }

// Scroll to an element
function scroll2(id) { emi(id).scrollIntoView() }

// Set functions for device type
function vport(func_desktop, func_mobile) {
	let h = window.innerHeight
	let w = window.innerWidth
	if ( percent(h, w) > 100 ) { func_mobile() }
	else { func_desktop() }
}

// Require a script into HTML
function require(source) {
	var script = document.createElement('script')
	script.src = source
	document.documentElement.appendChild(script)
}

// Load JS script / CSS sheet from a string
function loadstring(str) {
	var script = document.createElement('script')
	script.innerHTML = str
	document.documentElement.appendChild(script)
}
function loadsheet(str) {
	var style = document.createElement('style')
	style.innerHTML = str
	document.documentElement.appendChild(style)
}

// Copy text from an element to clipboard
function clip(id) {
	if ( emi(id) ) {
		navigator.clipboard.writeText(emi(id).textContent)
	} else { print('clip :: Element with id ['+id+'] does not exist') }
}

// Insert text into an element
function type(id, txt) {
	if ( emi(id) ) {
		emi(id).appendChild(document.createTextNode(txt))
		emi(id).appendChild(document.createElement('br'))
	} else { print('type :: Element with id ['+id+'] does not exist') }
}

// Erase text data of an element
function erase(id) {
	if ( emi(id) ) {
		emi(id).textContent = ''
	} else { print('erase :: Element with id ['+id+'] does not exist') }
}

// Erase all internal data of an element
function wipe(id) {
	if ( emi(id) ) {
		emi(id).innerHTML = ''
	} else { print('wipe :: Element with id ['+id+'] does not exist') }
}

// Remove one or multiple elements
function rm(...ids) {
	ids.forEach(function(id) {
		if ( emi(id) ) {
			emi(id).remove()
		} else { print('rm :: Element with id ['+id+'] does not exist') }
	})
}

// Make one or multiple elements/write data within a specific root body
function mk(root_id, html_or_array) {
	root = emi(root_id)
	if ( root ) {
		if ( typeof html_or_array === 'object' ) {
			for (var index in html_or_array) {
				root.innerHTML = root.innerHTML + html_or_array[index]
			}
		} else { root.innerHTML = root.innerHTML + html_or_array }
	} else { print('mk :: Root element with id ['+root_id+'] does not exist') }
}

// Animate an element, optionally add a second animation and set an interval
function a8(id, animation, a8opt, int_opt) {
	var a8em = emi(id)
	if ( a8em ) {
		if ( !a8opt && !int_opt ) { a8em.style.animation = animation }
		else {
			setInterval( function() { a8em.style.animation = animation }, int_opt )
			setInterval( function() { a8em.style.animation = a8opt }, int_opt*2 )
		}
	} else { print('a8 :: Element with id ['+id+'] does not exist') }
}

// Add a switch-state expression to an element and assign 2 animations to it
function a8ss(id, a8A, a8B) {
	var a8em = emi(id)
	if ( a8em ) {
		if ( !a8em.value || a8em.value === 'false' ) {
			a8em.style.animation = a8A
			a8em.value = 'true'
		}
		else if ( a8em.value === 'true' ) {
			a8em.style.animation = a8B
			a8em.value = 'false'
		}
	} else { print('a8 :: Element with id ['+id+'] does not exist') }
}

// Draggable elements; _set arg is optional, set it to 1 if you want to keep updated position
draggable = []
function drag(id, _set) {
	if (!emi(id).dragF) {
		emi(id).dragF = true; draggable.push(id)
		document.onmouseup = function(){ emi(id).dragF = false }
	}
	if (_set) { emi(id).dragSet = 1 }
}

// Mouse move event
document.onmousemove = function() {
	draggable.forEach(function(id){
		var em = emi(id)
		if (em && (em.dragF)) {
			em.style.position = 'fixed'
			em.style.left = 0+ (window.event.clientX - (em.clientWidth/2)) + 'px'
			em.style.top = 0+ (window.event.clientY - (em.clientHeight/2)) + 'px'
		} else if (!em.dragSet) {
			em.style.position = 'relative'
			em.style.left = '0px'
			em.style.top = '0px'
			draggable.splice(draggable.indexOf(id), 1)
		}
	})
}
`
	emi('htmlData').value = _html
	emi('cssData').value = _css
	emi('jsData').value = _js
}

setInterval(function(){
	emi("scroll_indicator").style.width = percent(
		emi('body_frame').scrollTop,
		emi('body_frame').scrollHeight
	) + "%"
}, 300)

// Mouse move event
document.onmousemove = function() {
	draggable.forEach(function(id){
		var em = emi(id)
		if (em && (em.dragF)) {
			em.style.position = 'fixed'
			em.style.left = 0+ (window.event.clientX - (em.clientWidth/2)) + 'px'
			em.style.top = 0+ (window.event.clientY - (em.clientHeight/2)) + 'px'
		} else if (!em.dragSet) {
			em.style.position = 'relative'
			em.style.left = '0px'
			em.style.top = '0px'
			draggable.splice(draggable.indexOf(id), 1)
		}
	})
}

// Window resize trigger
window.addEventListener('resize', function(){ init() }, false)
