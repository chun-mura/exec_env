package main

import (
	"fmt"
	"sync"
	"time"
)

func main() {
	ch1 := make(chan int)
	var wg sync.WaitGroup
	wg.Add(1)
	go func() {
		defer wg.Done()
		fmt.Println(<-ch1)
	}()
	ch1 <- 10
	close(ch1)
	v, ok := <-ch1
	fmt.Printf("%v %v\n", v, ok)
	wg.Wait()

	ch2 := make(chan int, 2)
	ch2 <- 1
	ch2 <- 2
	close(ch2)
	v, ok = <-ch2
	fmt.Printf("%v %v\n", v, ok)
	v, ok = <-ch2
	fmt.Printf("%v %v\n", v, ok)
	v, ok = <-ch2
	fmt.Printf("%v %v\n", v, ok)

	ch3 := generateCountStream()
	for v := range ch3 {
		fmt.Println(v)
	}

	// 通知専用channel struct{} = 0byte
	nCh := make(chan struct{})
	for i := 0; i < 5; i++ {
		wg.Add(1)
		go func(i int) {
			defer wg.Done()
			fmt.Printf("goroutine %v started\n", i)
			<-nCh
			fmt.Println(i)
		}(i)
	}
	time.Sleep(2 * time.Second)
	close(nCh)
	fmt.Println("unblocked by manual close")

	wg.Wait()
	fmt.Println("finish")
}
func generateCountStream() <-chan int { // 「<-」で読み取り専用の返り値となる
	ch := make(chan int) // チャネルの生成
	go func() {
		defer close(ch) // チャネルのクローズ
		for i := 0; i <= 5; i++ {
			ch <- i // チャネルの書き込み
		}
	}()
	return ch
	// 読み取り専用の返り値にすることで、チャネルの生成・クローズ・書き込みをカプセル化できる
}
