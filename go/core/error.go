package core

type SouthParkQuotesError struct {
	IsSouthParkQuotesError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewSouthParkQuotesError(code string, msg string, ctx *Context) *SouthParkQuotesError {
	return &SouthParkQuotesError{
		IsSouthParkQuotesError: true,
		Sdk:              "SouthParkQuotes",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *SouthParkQuotesError) Error() string {
	return e.Msg
}
