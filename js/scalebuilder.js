var selectedScale = 0;
var Tone = auctx.createOscillator();
var Tone2 = auctx.createOscillator();
var Tone3 = auctx.createOscillator();
var Volume = auctx.createGain();
var Volume2 = auctx.createGain();
var Volume3 = auctx.createGain();
Volume.connect(auctx.destination);
Volume2.connect(auctx.destination);
Volume3.connect(auctx.destination);
var ToneIsPlaying = false;
var scaleDropDownSelected = -1;
function run(){
    Tone.type = "sine";
    Tone2.type = "square";
    Tone3.type = "triangle";
    if(screen == "ScaleBuild"){
        if(Volume2.gain.value > 0){
            Volume2.gain.value*=0.932;
        }
        else{
            Volume2.gain.value = 0;
        }
        if(Volume3.gain.value > 0){
            Volume3.gain.value*=0.9;
        }
        else{
            Volume3.gain.value = 0;
        }
        if(Volume.gain.value > 0){
            Volume.gain.value*=0.88;
        }
        else{
            Volume.gain.value = 0;
        }


        canvas.width=window.innerWidth-3;
        canvas.height=window.innerHeight-4;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = Math.min(canvas.width, canvas.height*1.9)*0.01 + "px Arial";
        Rect(0,0,canvas.width,canvas.height, "base", false);
        Rect(canvas.width*0.01, canvas.height*0.02, canvas.width*0.88, canvas.height*0.96, "second", false);
        Rect(canvas.width*0.9, canvas.height*0.02, canvas.width*0.09, canvas.height*0.96, "second", false);
        for(var i = 0; i < scales.length+1; i++){
            if(i == scales.length){
                if(Rect(canvas.width*0.9, canvas.height*0.02+canvas.height*i*0.05, canvas.width*0.09, canvas.height*0.05, "second", true, false)){
                    if(clicking){
                        var notnum = window.prompt("How many notes should this scale have?");
                        if(notnum != null){
                            var nam = window.prompt("What do you want to call this scale?");
                        }
                        if(notnum != null && nam != null){
                            var wei = new Array(parseInt(notnum));
                            var col = new Array(parseInt(notnum));
                            var nams = new Array(parseInt(notnum));
                            for(var i = 0; i < notnum; i++){
                                wei[i] = 1;
                                col[i] = Math.round(Math.random());
                                nams[i] = i;
                            }
                            scales.push(new scale(440, 2, notnum, wei, col, nams, nam));
                        }
                    }
                }
                ctx.font = Math.min(canvas.width, canvas.height*1.9)*0.04 + "px Arial";
                ctx.fillStyle = textColor;
                ctx.fillText("+", canvas.width*0.945, canvas.height*0.05+canvas.height*i*0.05);
                ctx.font = Math.min(canvas.width, canvas.height*1.9)*0.01 + "px Arial";
            }
            else{
                if(selectedScale == i){
                    if(Rect(canvas.width*0.9, canvas.height*0.02+canvas.height*i*0.05, canvas.width*0.09, canvas.height*0.05, "third", true, false) && rClicking){
                        mouseXTemp = mouseX;
                        mouseYTemp = mouseY;
                        scaleDropDownSelected = i;
                    }
                    ctx.fillStyle = textColor3;
                }
                else{
                    if(Rect(canvas.width*0.9, canvas.height*0.02+canvas.height*i*0.05, canvas.width*0.09, canvas.height*0.05, "second", true, false)){
                        if(clicking){
                            selectedScale = i;
                        }
                        else if(rClicking){
                            mouseXTemp = mouseX;
                            mouseYTemp = mouseY;
                            scaleDropDownSelected = i;
                        }
                    }
                    ctx.fillStyle = textColor;
                }
                ctx.fillText(scales[i].name, canvas.width*0.945, canvas.height*0.045+canvas.height*i*0.05);
            }
        }

        if(Rect(canvas.width*0.9, canvas.height*0.93, canvas.width*0.09, canvas.height*0.05, "second", true, false) && clicking){
            screen = "Home";
        }
        ctx.fillStyle = textColor;
        ctx.fillText("Select", canvas.width*0.945, canvas.height*0.955);

        var current = scales[selectedScale];
        var col;
        if(current.colors[0] == 0){col = "#000000";}
        else{col = "#FFFFFF";}
        if(Rect(canvas.width*0.07, canvas.height*0.09, canvas.width*0.15, canvas.height*0.03, col, true, false)){
            if(rClicking){
                current.colors[0] = (current.colors[0] + 1) % 2;
            }
            else if(clicking){
                if(ToneIsPlaying){
                    Tone.stop();
                    Tone2.stop();
                    Tone3.stop();
                }
                Tone = auctx.createOscillator();
                Tone.frequency.setValueAtTime(current.baseNote*current.size, auctx.currentTime); // value in hertz
                Tone.connect(Volume);
                Tone.start();
                Volume.gain.value = 0.7;

                Tone2 = auctx.createOscillator();
                Tone2.frequency.setValueAtTime(current.baseNote*current.size, auctx.currentTime); // value in hertz
                Tone2.connect(Volume2);
                Tone2.start();
                Volume2.gain.value = 0.25;

                Tone3 = auctx.createOscillator();
                Tone3.frequency.setValueAtTime(current.baseNote*current.size, auctx.currentTime); // value in hertz
                Tone3.connect(Volume3);
                Tone3.start();
                Volume3.gain.value = 0.07;

                ToneIsPlaying = true;
            }
        }
        if(Rect(canvas.width*0.065 - canvas.height*0.03, canvas.height*0.09, canvas.height*0.03, canvas.height*0.03, "base", true, false) && clicking){
            var s = window.prompt("What would you like to rename this note to?");
            if(s != null){
                current.names[0] = s;
            }
        }
        ctx.fillStyle = textColor;
        ctx.fillText(current.names[0], canvas.width*0.065 - canvas.height*0.015, canvas.height*0.105);
        for(var i = 0; i < current.colors.length; i++){
            if(current.colors[i] == 0){col = "#000000";}
            else{col = "#FFFFFF";}
            if(Rect(canvas.width*0.07, canvas.height*0.09+canvas.height*0.03*current.colors.length-canvas.height*i*0.03, canvas.width*0.15, canvas.height*0.03, col, true, false)){
                if(rClicking){
                    current.colors[i] = (current.colors[i] + 1) % 2;
                }
                else if(clicking){
                    if(ToneIsPlaying){
                        Tone.stop();
                        Tone2.stop();
                        Tone3.stop();
                    }
                    var weighsum = 0;
                    for(var j = 0; j < current.weights.length; j++){
                        weighsum += parseInt(current.weights[j]);
                    }
                    var weighsofar = 0;
                    for(var j = 0; j < i; j++){
                        weighsofar += parseInt(current.weights[j]);
                    }
                    console.log(weighsum + ", " + weighsofar);
                    Tone = auctx.createOscillator();
                    Tone.frequency.setValueAtTime(Math.pow(Math.pow(current.size,1/weighsum),weighsofar)*current.baseNote, auctx.currentTime); // value in hertz
                    Tone.connect(Volume);
                    Tone.start();
                    ToneIsPlaying = true;
                    Volume.gain.value = 0.7;

                    Tone2 = auctx.createOscillator();
                    Tone2.frequency.setValueAtTime(Math.pow(Math.pow(current.size,1/weighsum),weighsofar)*current.baseNote, auctx.currentTime); // value in hertz
                    Tone2.connect(Volume2);
                    Tone2.start();
                    Volume2.gain.value = 0.25;

                    Tone3 = auctx.createOscillator();
                    Tone3.frequency.setValueAtTime(Math.pow(Math.pow(current.size,1/weighsum),weighsofar)*current.baseNote, auctx.currentTime); // value in hertz
                    Tone3.connect(Volume3);
                    Tone3.start();
                    Volume3.gain.value = 0.07;
                }
            }
            
            if(Rect(canvas.width*0.065 - canvas.height*0.03, canvas.height*0.09+canvas.height*0.03*current.colors.length-canvas.height*i*0.03, canvas.height*0.03, canvas.height*0.03, "base", true, false) && clicking){
                var s = window.prompt("What would you like to rename this note to?");
                if(s != null){
                    current.names[i] = s;
                }
            }
            if(Rect(canvas.width*0.225, canvas.height*0.075+canvas.height*0.03*current.colors.length-canvas.height*i*0.03, canvas.height*0.03, canvas.height*0.03, "base", true, false) && clicking){
                var n = window.prompt("What would you like to change this weight to?");
                if(n != null){
                    current.weights[i] = n;
                }
            }
            ctx.fillStyle = textColor;
            ctx.fillText(current.names[i], canvas.width*0.065 - canvas.height*0.015, canvas.height*0.105 + canvas.height*0.03*current.colors.length-canvas.height*i*0.03);
            ctx.fillText(current.weights[i], canvas.width*0.225 + canvas.height*0.015, canvas.height*0.09 + canvas.height*0.03*current.colors.length-canvas.height*i*0.03);
        }
        if(Rect(canvas.width*0.07, canvas.height*0.09 + canvas.height*0.03 * (current.colors.length + 1), canvas.width*0.15, canvas.height*0.03, "base", true, false) && clicking){
            var n = window.prompt("What would you like to change the number of notes to?");
            if(n != null){
                if(current.names.length > n){
                    while(current.names.length > n){
                        current.names.pop();
                        current.colors.pop();
                        current.weights.pop();
                    }
                }
                else{
                    while(current.names.length < n){
                        current.names.push("X");
                        current.colors.push(1);
                        current.weights.push(1);
                    }
                }
            }
        }
        ctx.fillStyle = textColor;
        ctx.fillText("Change number of notes", canvas.width*0.145, canvas.height*0.105 + canvas.height*0.03*(current.colors.length+1));

        ctx.fillText(current.names[0] + "0 Frequency:", canvas.width*0.4, canvas.height*0.07);
        if(Rect(canvas.width*0.44, canvas.height*0.05, canvas.width*0.04, canvas.height*0.04, "base", true, false) && clicking){
            cbn = window.prompt("What do you want the base frequency to be?");
            if(cbn != null){
                current.baseNote = cbn;
            }
        }
        
        ctx.fillStyle = textColor;
        ctx.fillText(current.baseNote, canvas.width*0.46, canvas.height*0.07);
        ctx.fillText("hz", canvas.width*0.493, canvas.height*0.07);

        if(scaleDropDownSelected >= 0){
            if(!Rect(mouseXTemp-canvas.width*0.1-4, mouseYTemp-4, canvas.width*0.1+8, canvas.height*0.140+14, "base", true, true)){
                scaleDropDownSelected = -1;
            }

            if(Rect(mouseXTemp-canvas.width*0.1, mouseYTemp, canvas.width*0.1, canvas.height*0.035, "third", true, true) && clicking){
                var nm = window.prompt("What would you like to rename this scale to?")
                if(nm != null){
                    scales[scaleDropDownSelected].name = nm;
                }
                scaleDropDownSelected = -1;
            }
            if(Rect(mouseXTemp-canvas.width*0.1, mouseYTemp+canvas.height*0.035+2, canvas.width*0.1, canvas.height*0.035, "third", true, true) && clicking){
                scales.push(new scale(scales[scaleDropDownSelected].baseNote, scales[scaleDropDownSelected].size, scales[scaleDropDownSelected].quantity, scales[scaleDropDownSelected].weights, scales[scaleDropDownSelected].colors, scales[scaleDropDownSelected].names, "Copy of "+scales[scaleDropDownSelected].name));
                scaleDropDownSelected = -1;
            }
            if(Rect(mouseXTemp-canvas.width*0.1, mouseYTemp+canvas.height*0.07+4, canvas.width*0.1, canvas.height*0.035, "third", true, true) && clicking){
                for(var i = scaleDropDownSelected; i < scales.length-1; i++){
                    scales[i] = scales[i+1];
                  }
                  scales.pop();

                  scaleDropDownSelected = -1;
            }

            if(Rect(mouseXTemp-canvas.width*0.1, mouseYTemp+canvas.height*0.105+6, canvas.width*0.1, canvas.height*0.035, "third", true, true) && clicking){
                scaleDropDownSelected = -1;
            }

            ctx.fillStyle = textColor3;
            ctx.fillText("Rename", mouseXTemp-canvas.width*0.05, mouseYTemp+canvas.height*0.0175);
            ctx.fillText("Copy", mouseXTemp-canvas.width*0.05, mouseYTemp+canvas.height*0.0525+2);
            ctx.fillText("Delete", mouseXTemp-canvas.width*0.05, mouseYTemp+canvas.height*0.0875+4);
            ctx.fillText("Cancel", mouseXTemp-canvas.width*0.05, mouseYTemp+canvas.height*0.1225+6);

        }

        if(rClicking){
            if(ToneIsPlaying){
                Tone.stop();
                Tone2.stop();
                Tone3.stop();
            }
            ToneIsPlaying = false;
        }
        clicking = false;
        rClicking = false;
    }
}

var interval = setInterval(run,10);