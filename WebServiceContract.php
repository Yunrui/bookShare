<?php
 
    class WSC
    {
		// this field is used to indicate application errors:
		// 0 : successful
		// 1 : customized errors
		// 2 : redirection, output is URL
        public $status;

		// all output goes there, if successful, it must be json string, otherwise error messages.
        public $output;
		
		public function wrapError($errorCode = 1, $errorMessage)
		{
			if (empty($errorMessage)) {
				die ('ASSERT: we must provide error messages.');
			}

			$this->status = $errorCode;
			$this->output = $errorMessage;

			return json_encode($this);
		}

		public function setOutput($output)
		{
			$this->status = 0;
			$this->output = $output;
			return json_encode($this);
		}
    }
?>
