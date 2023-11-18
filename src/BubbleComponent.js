// BubbleComponent.js

import React, { useEffect } from 'react';

function Bezier(a, b, c, d, t) {
	var point = { x: 0, y: 0 },
	mt = 1 - t,
	mt2 = mt * mt,
    mt3 = mt2 * mt;

	//fx(t) = x1 * (1-t)³ + x2 * 3 * (1-t)²t + x3 * 3 * (1-t)t² + x4 * t³
	point.x = a.x * mt3 + b.x * 3 * mt2 * t + c.x * 3 * mt * t * t + d.x * t * t * t;

	//fy(t) = y1 * (1-t)³ + y2 * 3 * (1-t)²t + y3 * 3 * (1-t)t² + y4 * t³
	point.y = a.y * mt3 + b.y * 3 * mt2 * t + c.y * 3 * mt * t * t + d.y * t * t * t;

	return point;
}

const BubbleComponent = () => {
  useEffect(() => {
    let i = document.querySelector('.bubble');
    const xmlns = "http://www.w3.org/2000/svg";
    const b_stroke = 3; // Bubble stroke thickness
    const t_length = 50 // Tail length
    const b_width = i.clientWidth; // Bubble width
    const b_height = i.clientHeight; // Bubble height

// -------------------------------------------------------
// Bubble coordinates
// -------------------------------------------------------

// Node 1
const b_node1_x = b_stroke /2; // X coordinate
const b_node1_y = b_height / 2; // Y coordinate

const b_node1_handleIn_x = b_node1_x;// Controller handle IN X coordinate
const b_node1_handleIn_y = ((b_height / 100)*20) * 4; // Controller handle IN Y coordinate

const b_node1_handleOut_x = b_node1_x; // Controller handle OUT X coordinate
const b_node1_handleOut_y = ((b_height / 100)*20) * 1; // Controller handle OUT Y coordinate

// Node 2
const b_node2_x = b_width / 2; // X coordinate
const b_node2_y = b_stroke /2; // Y coordinate

const b_node2_handleIn_x = ((b_width / 100)*20) *1; // Controller handle IN X coordinate
const b_node2_handleIn_y = b_node2_y; // Controller handle IN Y coordinate;

const b_node2_handleOut_x = ((b_width / 100)*20) *4; // Controller handle OUT X coordinate
const b_node2_handleOut_y = b_node2_y; // Controller handle OUT Y coordinate

// Node 3
const b_node3_x = b_width - (b_stroke /2); // Node 3 X coordinate
const b_node3_y = b_node1_y; // Node 3 Y coordinate

const b_node3_handleIn_x = b_node3_x; // Node 3 in controller X coordinate
const b_node3_handleIn_y = b_node1_handleOut_y; // Node 3 in controller Y coordinate

const b_node3_handleOut_x = b_node3_x; // Node 3 out controller X coordinate
const b_node3_handleOut_y = b_node1_handleIn_y; // Node 3 out controller Y coordinate

// Node 4
const b_node4_x = b_node2_x; // Node 4 X coordinate
const b_node4_y = b_height - (b_stroke /2); // Node 4 Y coordinate

const b_node4_handleIn_x = b_node2_handleOut_x; // Node 4 in controller X coordinate
const b_node4_handleIn_y = b_node4_y; // Node 4 in controller Y coordinate

const b_node4_handleOut_x = b_node2_handleIn_x; // Node 4 out controller X coordinate
const b_node4_handleOut_y = b_node4_y; // Node 4 out controller Y coordinate

// -------------------------------------------------------
// Bubble roadmap for oval portion
// -------------------------------------------------------

// Move to Node 1
let b_path = 'M' + b_node1_x + ',' + b_node1_y + ' '; // Move to node 1 X,Y coordinate

// Draw the first curve to node 2
b_path += 'C' + b_node1_handleOut_x + ',' + b_node1_handleOut_y; // Cubic bezier node1 OUT handle X,Y coordinate
b_path += ' ' + b_node2_handleIn_x + ',' + b_node2_handleIn_y; // Cubic bezier node2 IN handle X,Y coordinate
b_path += ' ' + b_node2_x + ',' + b_node2_y; // Cubic bezier node2 X,Y coordinate

// Draw the second curve to node 3 - Continuing the curve does not require the OUT handle
b_path += 'S' + b_node3_handleIn_x + ',' + b_node3_handleIn_y; // Cubic bezier node 3 IN handle X,Y coordinate
b_path += ' ' + b_node3_x + ',' + b_node3_y + ' '; // Cubic bezier node 3 X,Y coordinate

// Draw the third curve to node 4 - Continuing the curve does not require the OUT handle
b_path += 'S' + b_node4_handleIn_x + ',' + b_node4_handleIn_y; // Cubic bezier node 4 IN handle X,Y coordinate
b_path += ' ' + b_node4_x + ',' + b_node4_y; // Cubic bezier node 4 X,Y coordinate

// Draw the fourth curve to node 1 - Continuing the curve does not require the OUT handle
b_path += 'S' + b_node1_handleIn_x + ',' + b_node1_handleIn_y; // Cubic bezier node 4 IN handle X,Y coordinate
b_path += ' ' + b_node1_x + ',' + b_node1_y; // Cubic bezier node 4 X,Y coordinate

// // Close the path
b_path += ' ' + 'z';


// -------------------------------------------------------
// Bezier calc - Needed to calculate X,Y along a curve
// -------------------------------------------------------

// Set 1 - x,y
const bezier_point_0 = {
  x: b_node4_x - (b_stroke / 2),
  y: b_node4_y - (b_stroke / 2)
};

// Set 2 - x,y
const bezier_control_in = {
  x: b_node4_handleIn_x - (b_stroke / 2),
  y: b_node4_handleIn_y - (b_stroke / 2)
}

// Set 3 - x,y
const bezier_control_out = {
  x: b_node3_handleOut_x - (b_stroke / 2),
  y: b_node3_handleOut_y - (b_stroke / 2)
};

// Set 4 - x,y
const bezier_point_1 = {
  x: b_node3_x - (b_stroke / 2),
  y: b_node3_y - (b_stroke / 2)
};

// Return X and Y coordinates based on node location on bezier curve (.2)
const bezier_node_1 = Bezier(bezier_point_0, bezier_control_in, bezier_control_out, bezier_point_1, '.2'),

// Return X and Y coordinates based on node location on bezier curve (.2)
bezier_node_2 = Bezier(bezier_point_0, bezier_control_in, bezier_control_out, bezier_point_1, '.45');

// -------------------------------------------------------
// Tail coordinates
// -------------------------------------------------------
const t_node1_x = bezier_node_2.x; // Starting X coordinate
const t_node1_y = bezier_node_2.y; // Starting Y coordinate
const t_node2_x = bezier_node_1.x; // Horizontal line destination X coordinate
const t_node2_y = bezier_node_1.y; // Horizontal line destination Y coordinate
const t_node3_handle_x = bezier_node_2.x; // Quadratic handle X coordinate
const t_node3_handle_y = bezier_node_2.y + (t_length / 10); // Quadratic handle Y coordinate
const t_node3_x = bezier_node_2.x; // Quadratic end X coordinate
const t_node3_y = bezier_node_2.y + t_length; // Quadratic end Y coordinate

// -------------------------------------------------------
// Tail roadmap
// -------------------------------------------------------
let t_path = 'M' + t_node1_x + ',' + (t_node1_y - 1); // Move to
t_path += 'L' + t_node2_x + ',' + (t_node2_y - 1); // Draw horizontal line t
t_path += 'Q' + t_node3_handle_x + ',' + t_node3_handle_y; // Quadratic bezier curve handle coordinates
t_path += ' ' + t_node3_x + ',' + t_node3_y; // Quadratic bezier curve end coordinate
t_path += 'L' + t_node1_x + ',' + (t_node1_y - 1); // Draw a diagonal line to
t_path += 'z'; // Close path

// -------------------------------------------------------
// Construction
// -------------------------------------------------------
let b_svg = document.createElementNS(xmlns, "svg");
let b_svg_path_circle = document.createElementNS(xmlns, "path");
let t_svg_path1 = document.createElementNS(xmlns, "path");
let t_svg_path2 = document.createElementNS(xmlns, "path");


// Set the SVG attributes
b_svg.setAttribute("viewBox", "0 0 " + b_width + " " + (b_height + t_length));
b_svg.setAttribute("width", b_width);
b_svg.setAttribute("height", (b_height + t_length));

// Set the bubble attributes
b_svg_path_circle.setAttribute('d', b_path);
b_svg_path_circle.setAttribute('stroke', '#000');
b_svg_path_circle.setAttribute('stroke-width', b_stroke);
b_svg_path_circle.setAttribute('stroke-linecap', 'round');
b_svg_path_circle.setAttribute('stroke-linejoin', 'round');
b_svg_path_circle.setAttribute('fill', '#fff');

// Set the tail attributes
t_svg_path1.setAttribute('d', t_path);
t_svg_path1.setAttribute('stroke', '#000');
t_svg_path1.setAttribute('stroke-width', b_stroke*2);
t_svg_path1.setAttribute('stroke-linecap', 'round');
t_svg_path1.setAttribute('stroke-linejoin', 'round');
t_svg_path1.setAttribute('fill', '#000');

// Set the tail attributes
t_svg_path2.setAttribute('d', t_path);
t_svg_path2.setAttribute('fill', '#fff');

// Append the path to the SVG
b_svg.appendChild(t_svg_path1);

// Append the bubble path to the SVG
b_svg.appendChild(b_svg_path_circle);

// Append the path to the SVG
b_svg.appendChild(t_svg_path2);

// Append the completed SVG into the DOM
i.appendChild(b_svg);

  }, []); // Empty dependency array to run the code only once when the component mounts

  return (
    <div className="bubble-container">
      {/* The SVG bubble will be appended here */}
    </div>
  );
}

export default BubbleComponent;
