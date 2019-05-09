document.onkeydown = function(){down.play()}
document.onkeyup = function(){up.play()}
var parameters = ["stereoWidth", "revVol", "revLength", "revDecay", "volume"]
var stereoWidth = 0.5
var revVol = 0
var revLength = 3
var revDecay = 2
var volume = 0.5

function getValues ()
{
	parameters.forEach(checkLimits)
	stereoWidth = parseFloat(document.getElementById("stereoWidth").value)
	revVol = parseFloat(document.getElementById("revVol").value)
	revLength = parseFloat(document.getElementById("revLength").value)
	revDecay = parseFloat(document.getElementById("revDecay").value)
	volume = parseFloat(document.getElementById("volume").value)
	setup()
}

function checkLimits (parameter)
{
	var element = document.getElementById(parameter)
	if (parseFloat(element.value) > parseFloat(element.max))
	{
		element.value = parseFloat(element.max)
	}
	else if (parseFloat(element.value) < parseFloat(element.min))
	{
		element.value = parseFloat(element.min)
	}
}

function preload ()
{
	soundFormats('wav')
	down = loadSound("sound/down.wav")
	up = loadSound("sound/up.wav")
	
	down.playMode('sustain')
	up.playMode('sustain')
	
	downRev = new p5.Reverb()
	upRev = new p5.Reverb()
	
	// I probably should put some kind of low-pass on the reverb
	downRev.process(down, 3, 2)
	upRev.process(up, 3, 2)
	
	/*
	delay = new p5.Delay();
	
	delay.process(up, .12, .7, 2300);
	
	upRev.connect([delay])
	downRev.connect([delay])
	*/
}

function setup ()
{
	up.setVolume(volume)
	down.setVolume(volume)
	upRev.amp(revVol)
	downRev.amp(revVol)
	upRev.set(revLength, revDecay)
	downRev.set(revLength, revDecay)
}