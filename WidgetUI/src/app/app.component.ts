import { Component } from '@angular/core';
import * as joint from 'jointjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  stretch(element) {
    element.transition('size', { width: 270, height: 100 }, {
        delay: 1000,
        duration: 4000,
        valueFunction: joint.util.interpolate.object
    });

    element.transition('position', { x: 165, y: 100 }, {
        delay: 1000,
        duration: 4000,
        valueFunction: joint.util.interpolate.object
    });

    element.stretchToggle = false;
}

 contract(element) {
    element.transition('size', { width: 40, height: 40 }, {
        delay: 1000,
        duration: 4000,
        valueFunction: joint.util.interpolate.object
    });

    element.transition('position', { x: 280, y: 130 }, {
        delay: 1000,
        duration: 4000,
        valueFunction: joint.util.interpolate.object
    });

    element.stretchToggle = true;
}


 resetAll(paper: joint.dia.Paper) {
    paper.drawBackground({
        color: 'white'
    })

    var elements = paper.model.getElements();
    for (var i = 0, ii = elements.length; i < ii; i++) {
        var currentElement = elements[i];
        currentElement.attr('body/stroke', 'black');
    }

    var links = paper.model.getLinks();
    for (var j = 0, jj = links.length; j < jj; j++) {
        var currentLink = links[j];
        currentLink.attr('line/stroke', 'black');
        currentLink.label(0, {
            attrs: {
                body: {
                    stroke: 'black'
                }
            }
        })
    }
}


  ngAfterViewInit():void
  {

    var graph = new joint.dia.Graph;

        var paper = new joint.dia.Paper({
        el: document.getElementById('myholder'),
        model: graph,
        width: 600,
        height: 300,
        gridSize: 10,
        drawGrid: true,
        background: {
            color: 'rgba(0, 255, 0, 0.3)'
        },
        interactive: false
    });

    var CustomElement = joint.dia.Element.define('examples.CustomElement', {
        attrs: {
            body: {
                refWidth: '100%',
                refHeight: '100%',
                strokeWidth: 2,
                stroke: 'black',
                fill: 'white'
            },
            label: {
                textVerticalAnchor: 'middle',
                textAnchor: 'middle',
                refX: '50%',
                refY: '50%',
                fontSize: 14,
                fill: 'black'
            },
            button: {
                cursor: 'pointer',
                ref: 'buttonLabel',
                refWidth: '150%',
                refHeight: '150%',
                refX: '-25%',
                refY: '-25%'
            },
            buttonLabel: {
                pointerEvents: 'none',
                refX: '100%',
                refY: 0,
                textAnchor: 'middle',
                textVerticalAnchor: 'middle'
            }
        }
    },{
        markup: [{
            tagName: 'rect',
            selector: 'body',
        }, {
            tagName: 'text',
            selector: 'label'
        }, {
            tagName: 'rect',
            selector: 'button'
        }, {
            tagName: 'text',
            selector: 'buttonLabel'
        }]
    });

    var element = new CustomElement();
    element.position(250, 30);
    element.resize(100, 40);
    element.attr({
        label:{
            pointerEvents: 'none',
            visibility:'visible',
            text: 'element'
        },
        body:{
            cursor:'default',
             visibility:'visible'
        },
        button:{
            event: 'element:button:pointerdown',
            fill : 'orange',
            stroke: 'black',
            strokeWidth: 2
        },
        buttonLabel:{
            text: '__',
            fill:'black',
            fontSize: 8,
            fontWeight: 'bold'
        }
    });
    element.addTo(graph);

    paper.on('element:button:pointerdown', function(elementView, evt) {
        evt.stopPropagation(); // stop any further actions with the element view (e.g. dragging)
    
        var model = elementView.model;
    
        if (model.attr('body/visibility') === 'visible') {
            model.attr('body/visibility', 'hidden');
            model.attr('label/visibility', 'hidden');
            model.attr('buttonLabel/text', '＋'); // fullwidth plus
    
        } else {
            model.attr('body/visibility', 'visible');
            model.attr('label/visibility', 'visible');
            model.attr('buttonLabel/text', '＿'); // fullwidth underscore
        }
    });
    // var rect = new joint.shapes.standard.Rectangle();
    // rect.position(100, 30);
    // rect.resize(100, 40);
    // rect.attr({
    //     body: {
    //         cursor: 'pointer',
    //         fill: 'white',
    //         stoke: 'black'
    //     },
    //     label: {
    //         text: 'Element #1',
    //         cursor: 'pointer',
    //         fill: 'black'
    //     }
    // });
    // rect.addTo(graph);

    // var rect2 = rect.clone();
    // (<any>rect2).translate(300, 0);
    // rect2.attr('label/text', 'Element #2');
    // rect2.addTo(graph);

    // var link = new joint.shapes.standard.Link();
    // link.source(rect);
    // link.target(rect2);
    // link.attr({
    //     line: {
    //         stroke: 'black'
    //     }
    // });
    // (<any>link).labels([
    //     {
    //         markup: [{
    //             tagName: 'rect',
    //             selector: 'body'
    //         }, {
    //             tagName: 'text',
    //             selector: 'label'
    //         }],
    //         attrs: {
    //             label: {
    //                 cursor: 'pointer',
    //                 text: 'Link',
    //                 textAnchor: 'middle',
    //                 textVerticalAnchor: 'middle',
    //                 fontSize: 12,
    //                 fill: 'black'
    //             },
    //             body: {
    //                 cursor: 'pointer',
    //                 ref: 'label',
    //                 refX: '-10%',
    //                 refY: '-10%',
    //                 refWidth: '120%',
    //                 refHeight: '120%',
    //                 fill: 'white',
    //                 stroke: 'black',
    //                 strokeWidth: 2
    //             }
    //         }
    //     }
    // ]);

    // var info = new joint.shapes.standard.Rectangle();
    // info.position(250, 70);
    // info.resize(100, 20);
    // info.attr({
    //     body: {
    //         visibility: 'hidden',
    //         cursor: 'default',
    //         fill: 'white',
    //         stoke: 'black'
    //     },
    //     label: {
    //         visibility: 'hidden',
    //         text: 'Link clicked',
    //         cursor: 'default',
    //         fill: 'black',
    //         fontSize: 12
    //     }
    // });
    // info.addTo(graph);

    // link.addTo(graph);

    // paper.on('blank:pointerdblclick',()=>{
    //     console.log('blank:pointerdblclick',this);

    //     this.resetAll(paper);

    //     info.attr('body/visibility','hidden');
    //     info.attr('label/visibility','hidden');
    //     paper.drawBackground({
    //         color: 'orange'
    //     })
    // });

    // paper.on('element:pointerdblclick',(elementView)=>{
    //     this.resetAll(paper);

    //     var currentElement = elementView.model;
    //     currentElement.attr('body/stroke', 'orange')
    // });

    // paper.on('link:pointerdblclick',(linkView)=>{
    //     this.resetAll(paper);
    //     var currentLink = linkView.model;
    //     currentLink.attr('line/stroke', 'orange');
    //     currentLink.label(0, {
    //         attrs: {
    //             body: {
    //                 stroke: 'orange'
    //             }
    //         }
    //     })
    // });

    // paper.on('cell:pointerdblclick',(cellView)=>{
    //     var isElement = cellView.model.isElement();
    //     var message = (isElement ? 'Element' : 'Link') + ' clicked';
    //     info.attr('label/text', message);
    //     info.attr('label/visibility', 'visible');
    // });
    // var CustomLink = joint.dia.Link.define('examples.CustomLink',{
    //     attrs:{
    //         line:{
    //             connection:true,
    //             fill:'none',
    //             stroke:'orange',
    //             strokeWidth:2,
    //             sourceMarker:{
    //                 'type': 'circle',
    //                 'r': 4,
    //                 'fill': 'white',
    //                 'stroke': 'orange',
    //                 'stroke-width': '2'
    //             },
    //             targetMarker:{
    //                 'type': 'circle',
    //                 'r': 4,
    //                 'fill': 'white',
    //                 'stroke': 'orange',
    //                 'stroke-width': '2'
    //             }
    //         },
    //         arrowhead:{
    //             d : 'M -20 -10 0 0 -20 10 Z',
    //             fill: 'orange',
    //             stroke: 'none'
    //         },
    //         symbol:{
    //             d: 'M -20 -20 20 20',
    //             stroke: 'black',
    //             targetMarker:{
    //                 'type': 'path',
    //                 'd': 'M 0 0 10 -5 10 5 Z',
    //                 'fill': 'black',
    //                 'stroke': 'none'
    //             }
    //         }
    //     }
    // },{
    //     markup:[{
    //         tagName: 'path',
    //         selector: 'line'
    //     },{
    //         tagName: 'path',
    //         selector: 'arrowhead'
    //     },{
    //         tagName: 'path',
    //         selector: 'symbol'
    //     }]
    // });

    // var link = new CustomLink();
    // link.source(new g.Point(100, 110));
    // link.target(new g.Point(500, 110));
    // link.vertices([new g.Point(300, 190)]);
    // link.attr({
    //     symbol: {
    //         atConnectionRatio: 0.75
    //     },
    //     arrowhead: {
    //         atConnectionRatio: 0.75,
    //     }
    // });
    // link.addTo(graph);

    // var CustomElement = joint.dia.Element.define('examples.CustomElement',{
    //     attrs :{
    //         e:{ //ellipse
    //             strokeWidth:1,
    //             stroke:'#000000',
    //             fill: 'rgba(255,0,0,0.3)'
    //         },
    //         r:{ //rect
    //             strokeWidth:1,
    //             stroke:'#000000',
    //             fill: 'rgba(0,255,0,0.3)'
    //         }, //circle
    //         c:{
    //             strokeWidth:1,
    //             stroke:'#000000',
    //             fill: 'rgba(0,0,255,0.3)'
    //         },
    //         outline:{
    //             refX:0,
    //             refY:0,
    //             refWidth:'100%',
    //             refHeight:'100%',
    //             strokeWidth:1,
    //             stroke: '#000000',
    //             strokeDasharray: '5 5',
    //             strokeDashoffset: 2.5,
    //             fill: 'none'
    //         }
    //     }
    // }, {
    //     markup:[
    //         {
    //             tagName:'ellipse',
    //             selector: 'e'
    //         },
    //         {
    //             tagName:'rect',
    //             selector:'r'
    //         },
    //         {
    //             tagName:'circle',
    //             selector:'c'
    //         },
    //         {
    //             tagName:'rect',
    //             selector:'outline'
    //         }
    //     ]
    // });

    // var element = new CustomElement();
    // element.attr({
    //     e:{
    //         refRx: '50%',
    //         refRy: '50%',
    //         refCx: '50%', //coordinate of circle/ellipse center
    //         refCy: '50%',
    //         refX: '-50%',
    //         refY: '25%'
    //     },
    //     r:{
    //         refX: '100%',
    //          x : -10, //additional x offset
    //         refY: '100%',
    //          y: -10,
    //         refWidth: '50%',
    //         refHeight: '50%'
    //     },
    //     c:{
    //         refRCircumscribed: '50%',
    //         refCx: '50%',
    //         refCy: '50%'
    //     }
    // });


    // element.position(280, 130);
    // element.resize(70, 70);
    // element.addTo(graph);

    // (<any>element).currentTransitions = 0;
    // (<any>element).stretchToggle = false;

    // this.stretch(element);

    // element.on('transition:start', (element)=> {
    //     element.currentTransitions += 1;
    // });

    // element.on('transition:end', (element) => {
    //     element.currentTransitions -= 1;

    //     if (element.currentTransitions === 0) {
    //         if (element.stretchToggle) this.stretch(element);
    //         else this.contract(element)
    //     }
    // });








    //     var graph = new joint.dia.Graph;
    //     var paper = new joint.dia.Paper({
    //     el: document.getElementById('myholder'),
    //     model: graph,
    //     width: 600,
    //     height: 100,
    //     gridSize: 1
    // });

    // var rect = new joint.shapes.standard.Rectangle();
    // rect.position(100, 30);
    // rect.resize(100, 40);
    // rect.attr({
    //     body: {
    //         fill: 'blue'
    //     },
    //     label: {
    //         text: 'Hello',
    //         fill: 'white'
    //     }
    // });
    // rect.addTo(graph);

    // var rect2 = rect.clone();
    // (<any>rect2).translate(300, 0);

    // rect2.attr('label/text', 'World!');
    // rect2.addTo(graph);

    // var link = new joint.shapes.standard.Link();
    // link.source(rect);
    // link.target(rect2);
    // link.addTo(graph);
  }

  

}
