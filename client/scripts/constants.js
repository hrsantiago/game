// Global constants
var c_width = 640, c_height = 480;
var PPM = 50; // Pixels per meter
var c_collisionDistance = 0.001;

var Align = {}
Align.Left = 1,
Align.Right = 2,
Align.Top = 4,
Align.Bottom = 8,
Align.HorizontalCenter = 16,
Align.VerticalCenter = 32,
Align.TopLeft = Align.Top | Align.Left,
Align.TopRight = Align.Top | Align.Right,
Align.BottomLeft = Align.Bottom | Align.Left,
Align.BottomRight = Align.Bottom | Align.Right,
Align.CenterLeft = Align.VerticalCenter | Align.Left,
Align.CenterRight = Align.VerticalCenter | Align.Right,
Align.TopCenter = Align.Top | Align.HorizontalCenter,
Align.BottomCenter = Align.Bottom | Align.HorizontalCenter,
Align.Center = Align.VerticalCenter | Align.HorizontalCenter
