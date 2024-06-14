
document.addEventListener("DOMContentLoaded", function() 
{
    const sleepForm = document.getElementById("sleep-form");
    const sleepResults = document.getElementById("sleep-results");
    const sleepDurationText = document.getElementById("sleep-duration");
    const sleepCycleText = document.getElementById("sleep-cycle");
    const trackButton = document.getElementById("track-button");
    const sleepCycleInfoText = document.getElementById("sleep-cycle-info"); 

    function calculateSleepDuration(sleepTime, wakeTime) 
    {
    const sleepTimeParts = sleepTime.split(":");
    const wakeTimeParts = wakeTime.split(":");

    let sleepHours = parseInt(sleepTimeParts[0]);
    const sleepMinutes = parseInt(sleepTimeParts[1]);
    let wakeHours = parseInt(wakeTimeParts[0]);
    const wakeMinutes = parseInt(wakeTimeParts[1]);

    if (sleepHours > wakeHours || (sleepHours === wakeHours && sleepMinutes > wakeMinutes)) {
        wakeHours += 24;
    }

    const totalSleepMinutes = (wakeHours - sleepHours) * 60 + (wakeMinutes - sleepMinutes);
    const hours = Math.floor(totalSleepMinutes / 60);
    const minutes = totalSleepMinutes % 60;

    return { hours, minutes };
    }

    function calculateSleepCycle(sleepHours, sleepMinutes) 
    {
    const sleepTotalMinutes = sleepHours * 60 + sleepMinutes;
    const numCycles = Math.floor(sleepTotalMinutes / 90);
    const cycleStage = getCycleStage(numCycles);

    return `You completed ${numCycles} sleep cycles. You woke up during the ${cycleStage} stage.`;
    }

    function getCycleStage(numCycles, sleepTotalMinutes) {
        const stages = ['light', 'deep', 'REM'];
        let stage;
    
        if (sleepTotalMinutes >= 0 && sleepTotalMinutes <= 24) 
        {
            stage=stages[0];
        } 
        else if (sleepTotalMinutes <= 90 * numCycles) 
        {
            stage=stages[1];
        } 
        else {
            const remSleepMinutes = 90 * numCycles + 10 * Math.min(numCycles, 6);
            if (sleepTotalMinutes === remSleepMinutes) 
            {
                stage=stages[2];
            } 
            else 
            {
                stage=stages[1];
            }
        }

        return stage;
    }

    function calculateSleepCycleInfo(numCycles) 
        {
            const cycleStage = getCycleStage(numCycles);
            
            let cycleInfo = "";

            if (cycleStage === 'light') {
                cycleInfo = "Light sleep is the initial phase when you're transitioning from wakefulness to slumber. During this stage, muscle activity slows down, and your heart rate and breathing become more regular. It's easy to wake up from light sleep, and it typically constitutes about 5-10% of your total sleep cycle.Memory consolidation and overall restoration take place.";
            } else if (cycleStage === 'deep') {
                cycleInfo = " It is a period of profound rest. This stage is essential for physical restoration, as it contributes to muscle repair, immune system support, and overall growth. It is characterized by slow brain waves, and waking up from this stage might lead to grogginess. It usually accounts for around 10-25% of your sleep cycle.";
            } else if (cycleStage === 'REM') {
                cycleInfo = "REM sleep is a stage marked by rapid and random eye movements, along with heightened brain activity similar to wakefulness. It's the phase where most vivid dreams occur. It plays a role in memory consolidation, learning, and emotional processing. This stage becomes longer as the night progresses and makes up about 20-25% of your sleep cycle.This stage is important for emotional regulation, memory consolidation, and creative problem-solving.";
            }

            return cycleInfo;
        }

        trackButton.addEventListener("click", function(event) {
            event.preventDefault(); 

            const sleepTime = document.getElementById("sleep-time").value;
            const wakeTime = document.getElementById("wake-time").value;

            const { hours, minutes } = calculateSleepDuration(sleepTime, wakeTime);
            const numCycles = Math.floor((hours * 60 + minutes) / 90);
            const sleepCycle = calculateSleepCycle(hours, minutes);
            const sleepCycleInfo = calculateSleepCycleInfo(numCycles, hours, minutes);

            sleepDurationText.textContent = `Total Sleep Duration: ${hours} hours and ${minutes} minutes`;
            sleepCycleText.textContent = `Sleep Cycle: ${sleepCycle}`;
            sleepCycleInfoText.textContent = `Sleep Cycle Info: ${sleepCycleInfo}`;

            sleepForm.style.display = "none";
            sleepResults.style.display = "block";
        });

});
