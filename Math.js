"use strict"

function findPoint(P0,S0,P1,S1)
{
    let yInt0= P0.y - (P0.x * S0);
    let yInt1= P1.y - (P1.x * S1);

    let returnPoint= {x:0,y:0};
    returnPoint.x= (yInt0 - yInt1) / (S1 - S0);

    returnPoint.y= (S0 * returnPoint.x) + yInt0;
    
    return returnPoint;
}

function lerpPoint(Pi,Pf, delta)
{
    //Delta is the percentage between the points as a decimal
    let returnPoint= {x:0,y:0};

    let dx= Pf.x- Pi.x;
    returnPoint.x= (dx * delta) + Pi.x;

    let dy= Pf.y- Pi.y;
    returnPoint.y= (dy * delta) + Pi.y;

    return returnPoint;
}

function findDelta(xp, xi, xf, xc)
{
    let a= xf + xi - (2 * xc);
    let b= (2 * xc) - (2 * xi);
    let c= xi - xp;

    //quadratic formula
    let delta= (-b + Math.sqrt((b*b) - (4 * a * c))) / (2 * a);
    
    if (delta < 0)
    {
        delta= (-b - Math.sqrt((b*b) - (4 * a * c))) / (2 * a);
    }

    return delta;
}

function framePoints(P0, S0, P1, S1)
{
    let returnPoints= [];

    let Pc= findPoint(P0, S0, P1, S1);

    for(let xp = P0.x; xp <= P1.x; xp++)
    {
        let delta= findDelta(xp, P0.x, P1.x, Pc.x);

        let a= lerpPoint(P0,Pc,delta);

        let b= lerpPoint(Pc,P1,delta);
        returnPoints.push(lerpPoint(a,b,delta));
        /*
        let p= {x:0,y:0};
    
        let delta= Math.sqrt(i/((P1.x-Pc.x)-(Pc.x-P0.x)));
        console.log(delta);

        returnPoints[i]= lerpPoint(lerpPoint(P0,Pc,delta),lerpPoint(Pc,P1,delta),delta);
        */
    }
    return returnPoints;
}

function curvePoints(P0, S0, P1, S1)
{
    if ((S0 > 0 && S1 < 0) || (S0 < 0 && S1 > 0))
    {
        let returnPoints= [];

        let Pc= findPoint(P0, S0, P1, S1);

        for(let i = 0; i <= 100; i++)
        {
            let a= lerpPoint(P0,Pc,i/100);

            let b= lerpPoint(Pc,P1,i/100);

            returnPoints.push(lerpPoint(a,b,i/100));
        }
        return returnPoints;
    }
    else
    {   
        let middlePoint=
        {
            x: (P1.x - P0.x) * .5 + P0.x,
            y: (P1.y - P0.y) * .5 + P0.y,
            slope0: (S1 - S0) * -.5 - S0,
            slope1: (S1 - S0) * -.5 - S0
        };

        let returnPoints= [];

        let Pc= findPoint(P0, S0, middlePoint, middlePoint.slope0);

        for(let i= 0; i <= 50; i++)
        {
            let a= lerpPoint(P0,Pc,i/50);

            let b= lerpPoint(Pc,middlePoint,i/50);

            returnPoints.push(lerpPoint(a,b,i/50));
        }

        Pc= findPoint(middlePoint, middlePoint.slope1, P1, S1);

        for(let i= 1; i <= 50; i++)
        {
            let a= lerpPoint(middlePoint,Pc,i/50);

            let b= lerpPoint(Pc,P1,i/50);

            returnPoints.push(lerpPoint(a,b,i/50));
        }
        return returnPoints;
    }
    


}



//let p0= {x:0,y:1}; let s0= 2;
//let p1= {x:4,y:2}; let s1= -.5;

//console.log(findPoint(p0,s0,p1,s1));
//console.log(lerpPoint(p0,p1,.5));
//console.log(bezierPoints(p0,s0,p1,s1));