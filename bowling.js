class Frame{
    constructor(isStrike, isSpare, isClosed, score1, score2, totalScore, frameNum) {
        this.isStrike = isStrike;
        this.isSpare = isSpare;
        this.isClosed = isClosed;
        this.score1 = score1;
        this.score2 = score2;
        this.totalScore = totalScore;
        this.frameNum = 0;
    }
}

var input_string = '10,0,0,9,1,0,0,8,2,0,0,7,3,0,0,6,4,0,0';

var round_arr = input_string.split(',');
var frame_ptr = 0;
var frame_arr = [];
var isCurFrameClosed = false;

//Initialize frame array
for(var i=0; i<10; i++){
    var f = new Frame();
    f.isClosed =false;
    f.isStrike = false;
    f.isSpare = false;
    f.score1 = null;
    f.score2 = null;
    f.totalScore = null;
    f.frameNum = i;
    frame_arr.push(f);    
}

for(var i=0; i<round_arr.length; i++){    
    
    var cur_score = parseInt(round_arr[i]);
    var cur_frame = frame_arr[frame_ptr];        

    if(i >= frame_arr.length){
        var finalFrame = frame_arr[frame_arr.length -1];
        finalFrame.totalScore += cur_score;
    }
    else{
        if(cur_score == 10){
            cur_frame.score1 = 10;
            cur_frame.score2 = 0;
            cur_frame.isStrike = true;
            cur_frame.isClosed = true;
            cur_frame.totalScore = 10;
            
            if(frame_ptr > 0){
                var prev_frame = frame_arr[frame_ptr-1];
                if(prev_frame.isStrike == true){
                    prev_frame.totalScore += (cur_frame.score1 *2);
                }
                if(prev_frame.isSpare == true){
                    prev_frame.totalScore += (cur_frame.score1);
                }
            }
            frame_ptr++;
            isCurFrameClosed = true
        }
        else{
            if(cur_frame.score1 == null){
                cur_frame.score1 = cur_score;
                if(frame_ptr > 0){
                    var prev_frame = frame_arr[frame_ptr-1];
                    if(prev_frame.isStrike == true || prev_frame.isSpare == true){
                        prev_frame.totalScore += cur_frame.score1;
                    }
                }
            }            
            else{
                cur_frame.score2 = cur_score;
                cur_frame.totalScore = cur_frame.score1 + cur_frame.score2;
                if(cur_frame.totalScore == 10){
                    cur_frame.isSpare = true;
                }
                if(frame_ptr > 0){
                    if(prev_frame.isStrike == true){
                        prev_frame.totalScore += cur_frame.score2;
                    }
                }
                frame_ptr++;
                isCurFrameClosed = true
            }        
        }
    } 
}

calculateTotal(frame_arr);


function calculateTotal(frameArr){
    var result = 0;
    for(var i=0; i<10; i++){                
        //console.log(frameArr[i])
        result += frameArr[i].totalScore;
    }
    console.log(result);
    return result;
}