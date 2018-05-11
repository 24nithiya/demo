/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 * 
 *   http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

 if (!library)
	var library = {};

library.json = {
	replacer : function(match, pIndent, pKey, pVal, pEnd) {
		var key = '<span class=json-key>';
		var val = '<span class=json-value>';
		var str = '<span class=json-string>';
		var r = pIndent || '';
		if (pKey)
			r = r + key + pKey.replace(/[": ]/g, '') + '</span>: ';
		if (pVal)
			r = r + (pVal[0] == '"' ? str : val) + pVal + '</span>';
		return r + (pEnd || '');
	},
	prettyPrint : function(obj) {
		var jsonLine = /^( *)("[\w]+": )?("[^"]*"|[\w.+-]*)?([,[{])?$/mg;
		return JSON.stringify(obj, null, 3).replace(/&/g, '&amp;').replace(/\\"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(jsonLine, library.json.replacer);
	}
};

library.refreshPanels = function() {
	// hide all div containers
	$('#jsonPanels div.content').hide();
	// append click event to the a element
	$('#jsonPanels a').click(function(e) {
		// slide down the corresponding div if hidden, or slide up if shown
		$(this).parent().next('#jsonPanels div').slideToggle('slow');
		// set the current item as active
		$(this).parent().toggleClass('active');
		e.preventDefault();
	});
};

library.displayResult = function(title, content) {
	var jsonBlockTemplate = $("#jsonBlock-template");
	var requestBody = jsonBlockTemplate.html().replace('${heading}', title).replace('${content}', library.json.prettyPrint(content));
	$('#jsonPanels').append(requestBody);
};