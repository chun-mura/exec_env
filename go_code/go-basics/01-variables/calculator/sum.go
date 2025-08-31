package calculator

// import "fmt"

var offset float64 = 1 // private var
var Offset float64 = 1 // public var

func Sum(a float64, b float64) float64 { // public method
	// fmt.Println("multiply:", multiply(a, b))
	return a + b + offset
}
